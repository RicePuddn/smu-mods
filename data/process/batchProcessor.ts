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

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Unable to scan directory:", err);
    return;
  }

  const htmlFiles = files.filter((file) => path.extname(file) === ".html");
  htmlFiles.forEach((htmlFile) => {
    processModuleHtml(
      path.join(directoryPath, "html", htmlFile),
      path.join(directoryPath, "parsed"),
      projectBaseDir,
    );
  });
});
