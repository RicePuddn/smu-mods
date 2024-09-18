import type { ModuleBank } from "@/types/banks/moduleBank";
import {
  type Conflict,
  defaultPlanner,
  type ExamClashes,
  EXEMPTION_TERM,
  EXEMPTION_YEAR,
  type Planner,
  type PlannerState,
  type Term,
  type Year,
} from "@/types/planner";
import type { Module, ModuleCode } from "@/types/primitives/module";
import { notNull } from "@/types/utils";
import { get, groupBy, values } from "lodash";
import { checkPrerequisite } from "./checkPrerequisites";

export const prereqConflict =
  (modulesMap: ModuleBank, modulesTaken: Set<ModuleCode>) =>
  (moduleCode: ModuleCode): Conflict | null => {
    const prereqs = get(modulesMap, [moduleCode, "preReq"]);
    if (!prereqs) return null;

    const status = checkPrerequisite(modulesTaken, prereqs);
    if (status.fulfilled) return null;

    return { type: "prereq", statusNode: status.status };
  };

export const semesterConflict =
  (moduleCodeMap: ModuleBank, term: Term) =>
  (moduleCode: ModuleCode): Conflict | null => {
    const module = moduleCodeMap[moduleCode];
    if (!module) return null;
    if (!module.terms.includes(term)) {
      return { type: "term", termsOffered: module.terms };
    }

    return null;
  };

export const examConflict =
  (clashes: ExamClashes) =>
  (moduleCode: ModuleCode): Conflict | null => {
    const clash = values(clashes).find((modules) =>
      Boolean(modules.find((module) => module.moduleCode === moduleCode)),
    );

    if (clash) {
      return {
        type: "exam",
        conflictModules: clash.map((module) => module.moduleCode),
      };
    }

    return null;
  };

export function getPlanner(
  plannerState: PlannerState,
  moduleBank: ModuleBank,
): Planner {
  const planner: Planner = defaultPlanner;

  for (const key in plannerState.modules) {
    const moduleCode = key as ModuleCode;
    const plannerModule = plannerState.modules[moduleCode]!;
    const module = moduleBank[moduleCode];

    if (!module) continue;

    const modulesTaken = new Set<ModuleCode>();

    let clashes = {};
    if (!module.exam) {
      const semesterModules = Object.values(plannerState.modules)
        .map((moduleTime) => moduleTime.moduleCode)
        .filter(notNull)
        .map((moduleCode) => moduleBank[moduleCode])
        .filter(notNull);

      clashes = findExamClashes(semesterModules);
    }

    const conflicts = [
      prereqConflict(moduleBank, modulesTaken)(moduleCode),
      semesterConflict(moduleBank, plannerModule.term)(moduleCode),
      examConflict(clashes)(moduleCode),
    ].filter((conflict) => conflict !== null);

    if (
      plannerModule.year === EXEMPTION_YEAR &&
      plannerModule.term === EXEMPTION_TERM
    ) {
      planner[EXEMPTION_YEAR][EXEMPTION_TERM].push({
        id: moduleCode,
        moduleInfo: module,
        conflict: conflicts.length ? conflicts[0] : undefined,
        moduleCode,
      });
      continue;
    } else {
      const term = plannerModule.term as Exclude<Term, typeof EXEMPTION_TERM>;
      const year = plannerModule.year as Exclude<Year, typeof EXEMPTION_YEAR>;
      if (!planner[year][term]) {
        planner[year][term] = [];
      }

      planner[year][term].push({
        id: moduleCode,
        moduleInfo: module,
        conflict: conflicts.length ? conflicts[0] : undefined,
        moduleCode,
      });
    }
  }

  return planner;
}

export function findExamClashes(modules: Module[]): ExamClashes {
  const grouped = groupBy(modules, (module) => module.exam?.dateTime);

  const clashes: ExamClashes = {};

  for (const key in grouped) {
    const group = grouped[key];
    if (!group) continue;
    if (group.length > 1) {
      group.forEach((module) => {
        if (!clashes[module.moduleCode]) {
          clashes[module.moduleCode] = [];
        }

        clashes[module.moduleCode]!.push(module);
      });
    }
  }

  return clashes;
}
