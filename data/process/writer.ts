import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { APP_CONFIG } from "@/config";
import { ModuleBank } from "@/types/banks/moduleBank";
import { termMap } from "@/types/planner";
import { ModuleCode } from "@/types/primitives/module";

import { parseModulesHtml } from "./batchParser";

async function loadModuleBank(projectBaseDir: string): Promise<ModuleBank> {
  const moduleBankPath = path.join(
    projectBaseDir,
    "src/server/data/moduleBank.ts",
  );

  // Construct the URL for dynamic import
  const moduleUrl = fileURLToPath(`file://${moduleBankPath}`);

  // Dynamically import the module
  const { modules } = await import(moduleUrl + `?update=${Date.now()}`);
  return modules as ModuleBank;
}

export async function processModuleHtml(
  inputFilePath: string,
  jsonOutDir: string,
  projectBaseDir: string,
  jsonOutputEnabled: boolean = false,
): Promise<void> {
  const htmlData =
    "<html><body><table>" +
    readFileSync(inputFilePath, "utf-8") +
    "</table></body></html>";
  const modules = parseModulesHtml(htmlData);

  const moduleBank = await loadModuleBank(projectBaseDir);

  const newModuleBank = JSON.parse(JSON.stringify(moduleBank));

  modules.forEach((module) => {
    if (!existsSync(jsonOutDir)) {
      mkdirSync(jsonOutDir, { recursive: true });
    }

    if (jsonOutputEnabled) {
      writeFileSync(
        path.join(jsonOutDir, `${module.moduleCode}.json`),
        JSON.stringify(module, null, 2),
      );
    } else {
      if (!moduleBank) {
        throw new Error("Unable to load module bank");
      }

      if (newModuleBank[module.moduleCode as ModuleCode]) {
        newModuleBank[module.moduleCode as ModuleCode]!.sections =
          module.sections ?? [];
        newModuleBank[module.moduleCode as ModuleCode]!.exam = module.exam;
        newModuleBank[module.moduleCode as ModuleCode]!.terms = [
          ...new Set([
            ...newModuleBank[module.moduleCode as ModuleCode]!.terms,
            termMap[APP_CONFIG.currentTerm],
          ]),
        ];
        newModuleBank[module.moduleCode as ModuleCode]!.credit =
          module.credit ?? 1;
        newModuleBank[module.moduleCode as ModuleCode]!.description =
          newModuleBank[module.moduleCode as ModuleCode]!.description.length < 1
            ? (module.description ?? "DESCRIPTION_NEEDED")
            : newModuleBank[module.moduleCode as ModuleCode]!.description;
      } else {
        console.log(`New module found: ${module.moduleCode}`);
        newModuleBank[module.moduleCode as ModuleCode] = {
          name: module.name ?? "",
          moduleCode: module.moduleCode as ModuleCode,
          exam: module.exam,
          description: module.description ?? "DESCRIPTION_NEEDED",
          credit: module.credit ?? 1,
          terms: [termMap[APP_CONFIG.currentTerm]],
          sections: module.sections ?? [],
        };
      }

      // Replace dateTime fields in a structured way to avoid unterminated string issues

      // Write the updated module bank to the output file
    }
  });
  const outputFilePath = path.join(
    projectBaseDir,
    "src/server/data/moduleBank.ts",
  );

  const moduleBankString = JSON.stringify(newModuleBank, null, 2).replaceAll(
    /"dateTime": "([^"]+)"/g,
    '"dateTime": new Date("$1")',
  );

  const writeStream = createWriteStream(outputFilePath, {
    encoding: "utf-8",
  });
  writeStream.write(
    `import type { ModuleBank } from "@/types/banks/moduleBank";\n\n`,
  );
  writeStream.write(`export const modules: ModuleBank = `);
  writeStream.write(moduleBankString);
  writeStream.end(";\n");

  writeStream.on("finish", () => {});

  writeStream.on("error", (err) => {
    console.error("Error writing file:", err);
  });
}
