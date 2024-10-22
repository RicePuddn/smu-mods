import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

import { parseModuleHtml } from "./parser";

export function processModuleHtml(inputFilePath: string, outDir: string): void {
  const htmlData =
    "<html><body><table>" +
    readFileSync(inputFilePath, "utf-8") +
    "</table></body></html>";
  const module = parseModuleHtml(htmlData);
  const inputFileName = path.basename(inputFilePath);
  const moduleCode = inputFileName?.split(".")[0];
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }
  writeFileSync(
    path.join(outDir, `${moduleCode}.json`),
    JSON.stringify(module, null, 2),
  );
}
