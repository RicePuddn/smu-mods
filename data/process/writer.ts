import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

import { APP_CONFIG } from "@/config";
import { modules } from "@/server/data/moduleBank";
import { ModuleBank } from "@/types/banks/moduleBank";
import { termMap } from "@/types/planner";
import { ModuleCode } from "@/types/primitives/module";

import { parseModuleHtml } from "./parser";

export function processModuleHtml(
  inputFilePath: string,
  jsonOutDir: string,
  projectBaseDir: string,
  jsonOutputEnabled: boolean = false,
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
  if (jsonOutputEnabled) {
    writeFileSync(
      path.join(jsonOutDir, `${moduleCode}.json`),
      JSON.stringify(module, null, 2),
    );
  } else {
    const newModuleBank = JSON.parse(JSON.stringify(modules)) as ModuleBank;
    if (newModuleBank[moduleCode as ModuleCode]) {
      console.log(`Module found: ${moduleCode}`);
      newModuleBank[moduleCode as ModuleCode]!.sections = module.sections ?? [];
      newModuleBank[moduleCode as ModuleCode]!.exam = module.exam;
      newModuleBank[moduleCode as ModuleCode]!.terms = [
        ...new Set([
          ...newModuleBank[moduleCode as ModuleCode]!.terms,
          termMap[APP_CONFIG.currentTerm],
        ]),
      ];
      newModuleBank[moduleCode as ModuleCode]!.credit = module.credit ?? 1;
      newModuleBank[moduleCode as ModuleCode]!.description =
        newModuleBank[moduleCode as ModuleCode]!.description.length < 1
          ? (module.description ?? "DESCRIPTION_NEEDED")
          : newModuleBank[moduleCode as ModuleCode]!.description;
    } else {
      console.log(`New module found: ${moduleCode}`);
      newModuleBank[moduleCode as ModuleCode] = {
        name: module.name ?? "",
        moduleCode: moduleCode as ModuleCode,
        exam: module.exam,
        description: module.description ?? "DESCRIPTION_NEEDED",
        credit: module.credit ?? 1,
        terms: [termMap[APP_CONFIG.currentTerm]],
        sections: module.sections ?? [],
      };
    }

    writeFileSync(
      path.join(projectBaseDir, "src/server/data/moduleBank.ts"),
      `import type { ModuleBank } from "@/types/banks/moduleBank";
    
export const modules: ModuleBank = ${JSON.stringify(newModuleBank, null, 2)};
    `.replace(/"dateTime":\s*"([^"]*)"/g, `"dateTime": new Date("$1")`),
    );
  }
}
