import fs, { createWriteStream } from "fs";
import path from "path";
import { BidRecord } from "@prisma/client";
import * as XLSX from "xlsx";

import { db } from "@/server/db";
import { Logger } from "@/utils/Logger";

export async function processXLS(
  inputFilePath: string,
  jsonOutDir: string,
  projectBaseDir: string,
  jsonOutputEnabled: boolean = false,
): Promise<void> {
  const rows: BidRecord[] = [];
  try {
    // Read the file into a binary string
    const fileBuffer = fs.readFileSync(inputFilePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });

    // Iterate over each sheet in the workbook
    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      if (!worksheet) {
        return;
      }

      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      jsonData.forEach((row: any) => {
        // Convert the row to a BidRecord
        const bidRecord: BidRecord = {
          term: row["Term"] ?? "",
          session: row["Session"] ?? "",
          biddingWindow: row["Bidding Window"] ?? "",
          moduleCode: row["Course Code"] ?? "",
          section: row["Section"] ?? "",
          description: row["Description"] ?? "",
          vacancy: row["Vacancy"] ?? 0,
          openingVacancy: row["Opening Vacancy"] ?? 0,
          beforeProcessVacancy: row["Before Process Vacancy"] ?? 0,
          afterProcessVacancy: row["After Process Vacancy"] ?? 0,
          dice: row["DICE"] ?? 0,
          enrolledStudents: row["Enrolled Students"] ?? 0,
          medianBid: row["Median Bid"] ?? 0,
          minBid: row["Min Bid"] ?? 0,
          instructor: (row["Instructor"] ?? "")
            .split(",")
            .map((instructor: string) => instructor.trim()),
          school: row["School/Department"],
        };
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
    await db.bidRecord.createMany({ data: rows });
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
