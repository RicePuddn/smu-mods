import fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

import { Logger } from "@/utils/Logger";

import { processXLS } from "./writer";

// Equivalent to __dirname in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the directory path
const directoryPath = path.resolve(__dirname, "..");
const projectBaseDir = path.resolve(directoryPath, "..");

let xlsFiles: string[] = [];
try {
  const files = fs.readdirSync(path.join(directoryPath, "xls"));
  xlsFiles = files.filter((file) => path.extname(file) === ".xls");
} catch (err) {
  Logger.error("Unable to scan directory:", err);
}

console.log("Processing files:", xlsFiles);

for (const xlsFile of xlsFiles) {
  try {
    await processXLS(
      path.join(directoryPath, "xls", xlsFile),
      path.join(directoryPath, "parsed", "bidAnalytics"),
      projectBaseDir,
    );
  } catch (error) {
    Logger.error(`Error processing file ${xlsFile}:`, error);
  }
}
