import type { ReactNode } from "react";

import { type TermSlug } from "./types/planner";

export type AcademicYear = `${number}/${number}`;

export type Banner = {
  message: ReactNode;
};

export type Config = {
  academicYear: AcademicYear;
  currentTerm: TermSlug;
  banners: Banner[];
};

export const PADDING = "2rem";

export const APP_CONFIG: Config = {
  academicYear: "2024/2025",
  currentTerm: "term-2",
  banners: [
    {
      message: "Welcome to the new academic year!",
    },
  ],
};
