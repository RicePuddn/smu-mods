import { type TermSlug } from "./types/planner";

export type AcademicYear = `${number}/${number}`;

export type Config = {
  academicYear: AcademicYear;
  currentTerm: TermSlug;
};

export const PADDING = "2rem";

export const APP_CONFIG: Config = {
  academicYear: "2024/2025",
  currentTerm: "term-2",
};
