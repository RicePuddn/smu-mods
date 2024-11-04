import fs, { createWriteStream } from "fs";
import path from "path";
import { BidRecord } from "@prisma/client";
import * as XLSX from "xlsx";

import { db } from "@/server/db";
import { Logger } from "@/utils/Logger";

export async function processXLS(
  inputFilePath: string,
  jsonOutDir: string,
  jsonOutputEnabled: boolean = false,
): Promise<void> {
  const rows: BidRecord[] = [];
  try {
    // Read the file into a binary string
    const fileBuffer = fs.readFileSync(inputFilePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });

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

    // Iterate over each sheet in the workbook
    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      if (!worksheet) {
        return;
      }

      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      jsonData.forEach((row: any) => {
        const bidRecord: BidRecord = cleanUpRowData(row, columnMapping);
        rows.push(bidRecord);
      });
    });
  } catch (error) {
    console.error("Error reading the file:", error);
  }
  if (!rows[0]) {
    return;
  }
  if (!jsonOutputEnabled) {
    const existingRecords = await db.bidRecord.findMany({
      where: { term: rows[0].term },
      select: {
        term: true,
        session: true,
        biddingWindow: true,
        moduleCode: true,
        section: true,
      },
    });

    // Step 2: Create a Set of unique identifiers based on the composite key
    const existingKeys = new Set(
      existingRecords.map(
        (record) =>
          `${record.term}-${record.session}-${record.biddingWindow}-${record.moduleCode}-${record.section}`,
      ),
    );

    // Step 3: Filter rows that are not already in the database
    const newRows = rows.filter(
      (row) =>
        !existingKeys.has(
          `${row.term}-${row.session}-${row.biddingWindow}-${row.moduleCode}-${row.section}`,
        ),
    );

    // Step 4: Insert only the new rows
    if (newRows.length > 0) {
      await db.bidRecord.createMany({ data: newRows });
    }
  } else {
    const writeStream = createWriteStream(
      path.join(
        jsonOutDir,
        `${[rows[0].term, rows[0].session, rows[0].biddingWindow].join(
          "-",
        )}.json`,
      ),
      {
        encoding: "utf-8",
      },
    );
    writeStream.write(JSON.stringify(rows, null, 2));
    writeStream.end("\n");

    writeStream.on("finish", () => {});

    writeStream.on("error", (err) => {
      Logger.error("Error writing file:", err);
    });
  }
}

export type ColumnMapping = Record<keyof BidRecord, string>;

export function cleanUpRowData(
  row: any,
  columnMapping: ColumnMapping,
): BidRecord {
  const parseNumber = (value: any, defaultValue: number = 0) =>
    typeof value === "number" ? value : parseFloat(value) || defaultValue;

  const parseString = (value: any, defaultValue: string = "") =>
    typeof value === "string" ? value : defaultValue;

  const instructorSet = new Set<string>(
    parseString(row[columnMapping["instructor"]])
      .split(",")
      .map((instructor: string) => instructor.trim())
      .filter(Boolean),
  );
  const instructorArray = Array.from(instructorSet);

  const bidRecord: BidRecord = {
    term: parseString(row[columnMapping["term"]]),
    session: parseString(row[columnMapping["session"]]),
    biddingWindow: parseString(row[columnMapping["biddingWindow"]]),
    moduleCode: parseString(row[columnMapping["moduleCode"]]),
    section: parseString(row[columnMapping["section"]]),
    description: parseString(row[columnMapping["description"]]),
    vacancy: parseNumber(row[columnMapping["vacancy"]]),
    openingVacancy: parseNumber(row[columnMapping["openingVacancy"]]),
    beforeProcessVacancy: parseNumber(
      row[columnMapping["beforeProcessVacancy"]],
    ),
    afterProcessVacancy: parseNumber(row[columnMapping["afterProcessVacancy"]]),
    dice: parseNumber(row[columnMapping["dice"]]),
    enrolledStudents: parseNumber(row[columnMapping["enrolledStudents"]]),
    medianBid: parseNumber(row[columnMapping["medianBid"]]),
    minBid: parseNumber(row[columnMapping["minBid"]]),
    instructor: instructorArray,
    school: parseString(row[columnMapping["school"]]),
  };

  return bidRecord;
}
