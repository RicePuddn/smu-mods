import fs from "fs";
import * as XLSX from "xlsx";

export async function processXLS(
  inputFilePath: string,
  jsonOutDir: string,
  projectBaseDir: string,
  jsonOutputEnabled: boolean = false,
): Promise<void> {
  function readXlsFile(filePath: string): void {
    try {
      // Read the file into a binary string
      const fileBuffer = fs.readFileSync(filePath);
      const workbook = XLSX.read(fileBuffer, { type: "buffer" });

      // Iterate over each sheet in the workbook
      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
          return;
        }

        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log(`Data from sheet: ${sheetName}`);
        console.log(jsonData);
      });
    } catch (error) {
      console.error("Error reading the file:", error);
    }
  }
}
