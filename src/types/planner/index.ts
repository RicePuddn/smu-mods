import { type StatusNode } from "@/utils/checkPrerequisites";
import type { Module, ModuleCode } from "../primitives/module";

export type ExamConflict = {
  type: "exam";
  conflictModules: ModuleCode[];
};

export type TermConflict = {
  type: "term";
  termsOffered: readonly Term[];
};

export type PrereqConflict = {
  type: "prereq";
  statusNode?: StatusNode;
};

export type ExamClashes = Record<string, Module[]>;

export type Conflict = PrereqConflict | ExamConflict | TermConflict;

export type PlannerModuleInfo = Record<
  ModuleCode,
  {
    conflict?: Conflict;
  }
>;

export const EXEMPTION_YEAR = "-1";
export const years = ["1", "2", "3", "4", "5"] as const;

export type Year = (typeof years)[number];

export const EXEMPTION_TERM = "Term 0";
export const terms = ["Term 1", "Term 2", "Term 3A", "Term 3B"] as const;
export type Term = (typeof terms)[number];

export type PlannerModule = {
  id: string;

  year: Year;
  term: Term;

  moduleCode: ModuleCode;
};

export type PlannerState = {
  minYear: Year;
  maxYear: Year;

  modules: Record<ModuleCode, PlannerModule>;
};

export const defaultPlannerState: PlannerState = {
  minYear: "1",
  maxYear: "5",
  modules: {},
};

export type Planner = Record<Year, Record<Term, PlannerModuleInfo>> & {
  "-1": Record<typeof EXEMPTION_TERM, PlannerModuleInfo>;
};

export const defaultPlanner: Planner = {
  "1": {
    "Term 1": {},
    "Term 2": {},
    "Term 3A": {},
    "Term 3B": {},
  },
  "2": {
    "Term 1": {},
    "Term 2": {},
    "Term 3A": {},
    "Term 3B": {},
  },
  "3": {
    "Term 1": {},
    "Term 2": {},
    "Term 3A": {},
    "Term 3B": {},
  },
  "4": {
    "Term 1": {},
    "Term 2": {},
    "Term 3A": {},
    "Term 3B": {},
  },
  "5": {
    "Term 1": {},
    "Term 2": {},
    "Term 3A": {},
    "Term 3B": {},
  },
  "-1": {
    "Term 0": {},
  },
};
