import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

import { processModuleHtml } from "./writer";

// Equivalent to __dirname in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the directory path
const directoryPath = path.resolve(__dirname, "..");
const projectBaseDir = path.resolve(directoryPath, "..");

let htmlFiles: string[] = [];
try {
  const files = fs.readdirSync(path.join(directoryPath, "html"));
  htmlFiles = files.filter((file) => path.extname(file) === ".html");
} catch (err) {
  console.error("Unable to scan directory:", err);
}

for (const htmlFile of htmlFiles) {
  try {
    await processModuleHtml(
      path.join(directoryPath, "html", htmlFile),
      path.join(directoryPath, "parsed"),
      projectBaseDir,
    );
    console.log(`Processed file: ${htmlFile}`);
  } catch (error) {
    console.error(`Error processing file ${htmlFile}:`, error);
  }
}
