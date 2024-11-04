import { BidRecord } from "@prisma/client";
import { cleanUpRowData, ColumnMapping } from "data/bidAnalytics/writer";
import { By, ThenableWebDriver, until } from "selenium-webdriver";

import { db } from "@/server/db";

import { loginToBoss } from "./auth";
import { getDriver } from "./driver";

const baseUrl = "https://boss.intranet.smu.edu.sg/";

const driver = getDriver();

await loginToBoss(driver, baseUrl);

await driver.navigate().to(`${baseUrl}/OverallResults.aspx`);

const columnMapping: ColumnMapping = {
  term: "Term",
  session: "Session",
  biddingWindow: "Bidding Window",
  moduleCode: "Course",
  description: "Description",
  section: "Sect",
  medianBid: "Median",
  minBid: "Min",
  vacancy: "Vacancy",
  openingVacancy: "Open",
  beforeProcessVacancy: "Bef Proc",
  afterProcessVacancy: "Aft Proc",
  dice: "DICE",
  enrolledStudents: "Enrolled",
  instructor: "Instructor",
  school: "School",
};

const existingRecords = await db.bidRecord.findMany({
  where: {
    term: "2024-25 Term 2",
  },
  select: {
    term: true,
    session: true,
    biddingWindow: true,
    moduleCode: true,
    section: true,
  },
});

const existingKeys = new Set(
  existingRecords.map(
    (record) =>
      `${record.term}-${record.session}-${record.biddingWindow}-${record.moduleCode}-${record.section}`,
  ),
);

async function scrapeTable(driver: ThenableWebDriver) {
  const tableData = [];

  while (true) {
    // Wait for the table to load
    await driver.wait(
      until.elementLocated(By.css("table.rgMasterTable")),
      5000,
    );

    // Get all rows in the table except the header
    const rows = await driver.findElements(
      By.css("table.rgMasterTable tbody tr"),
    );

    // Iterate over each row
    for (const row of rows) {
      // Get all cells in the row
      const cells = await row.findElements(By.css("td"));

      // Extract the text from each cell and assign to corresponding column names
      const rowData = {
        Term: await cells[0]?.getText(),
        Session: await cells[1]?.getText(),
        "Bidding Window": await cells[2]?.getText(),
        Course: await cells[3]?.getText(),
        Description: await cells[4]?.getText(),
        Sect: await cells[5]?.getText(),
        Median: await cells[6]?.getText(),
        Min: await cells[7]?.getText(),
        Vacancy: await cells[8]?.getText(),
        Open: await cells[9]?.getText(),
        "Bef Proc": await cells[10]?.getText(),
        "Aft Proc": await cells[11]?.getText(),
        DICE: await cells[12]?.getText(),
        Enrolled: await cells[13]?.getText(),
        Instructor: await cells[14]?.getText(),
        School: await cells[15]?.getText(),
      };

      const bidRecord: BidRecord = cleanUpRowData(rowData, columnMapping);
      // Add row data to the array
      const identifier = `${bidRecord.term}-${bidRecord.session}-${bidRecord.biddingWindow}-${bidRecord.moduleCode}-${bidRecord.section}`;
      if (!existingKeys.has(identifier)) {
        tableData.push(bidRecord);
        existingKeys.add(identifier);
      }
    }

    // Try to find the 'Next' button and check if it's disabled
    let nextButton;
    try {
      nextButton = await driver.findElement(
        By.css('input[class="rgPageNext"]'),
      );
    } catch (error) {
      console.log("Next button not found, stopping pagination.");
      break;
    }

    // If button is not clickable or disabled, break the loop
    const isDisabled =
      (await nextButton.getAttribute("onclick")) === "return false;";
    if (isDisabled) {
      break; // Exit loop if 'Next' button is effectively disabled
    } else {
      await nextButton.click(); // Go to the next page
      if (!rows[0]) {
        console.log("Row not found, stopping pagination.");
        break;
      }
      await driver.wait(until.stalenessOf(rows[0]), 5000); // Wait for the table to refresh
    }
  }

  await driver.quit();
  return tableData;
}

const tableData = await scrapeTable(driver);

if (!tableData[0]) {
  console.log("No data found, exiting.");
  process.exit(0);
}

const affectedRows = await db.bidRecord.createMany({ data: tableData });
console.log(`Inserted ${affectedRows.count} new rows.`);
