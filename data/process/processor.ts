import * as path from "path";
import { fileURLToPath } from "url";

import { processModuleHtml } from "./writer";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Please provide the name of the file as an argument.");
  process.exit(1);
}

const fileName = args[0];

if (!fileName) {
  console.error("File not found.");
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.resolve(__dirname, "..");
const filePath = path.join(directoryPath, "html", fileName);

console.log("File Path:", filePath);

const projectBaseDir = path.resolve(directoryPath, "..");

processModuleHtml(filePath, path.join(directoryPath, "parsed"), projectBaseDir);
