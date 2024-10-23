import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

import { modules } from "@/server/data/moduleBank";
import { ModuleBank } from "@/types/banks/moduleBank";
import { ModuleCode } from "@/types/primitives/module";

import { parseModuleHtml } from "./parser";

export function processModuleHtml(
  inputFilePath: string,
  jsonOutDir: string,
  projectBaseDir: string,
): void {
  const htmlData =
    "<html><body><table>" +
    readFileSync(inputFilePath, "utf-8") +
    "</table></body></html>";
  const module = parseModuleHtml(htmlData);
  const inputFileName = path.basename(inputFilePath);
  const moduleCode = inputFileName?.split(".")[0];
  if (!existsSync(jsonOutDir)) {
    mkdirSync(jsonOutDir, { recursive: true });
  }
  writeFileSync(
    path.join(jsonOutDir, `${moduleCode}.json`),
    JSON.stringify(module, null, 2),
  );
  const newModuleBank = JSON.parse(JSON.stringify(modules)) as ModuleBank;
  if (newModuleBank[moduleCode as ModuleCode]) {
    newModuleBank[moduleCode as ModuleCode]!.sections = module.sections ?? [];
    newModuleBank[moduleCode as ModuleCode]!.exam = module.exam;
  }

  writeFileSync(
    path.join(projectBaseDir, "src/server/data/moduleBank.ts"),
    `import type { ModuleBank } from "@/types/banks/moduleBank";
    
export const modules: ModuleBank = ${JSON.stringify(newModuleBank, null, 2)};
    `.replace(/"dateTime":\s*"([^"]*)"/g, `"dateTime": new Date("$1")`),
  );
}
