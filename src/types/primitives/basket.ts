import type { Track } from "./major";
import type { ModuleCode } from "./module";

export const baskets = [
  "Numeracy",
  "Modes Of Thinking",
  "Managing",
  "Writing and Reasoning",
  "Internship",
  "Economics and Society",
  "Technology, Science And Society",
  "Cultures Of The Modern World",
  "Community Service",
  "Ethics And Social/ Corporate Responsibility",
  "Big Questions",
  "Global Exposure",
  "Ethics And Social Responsibility",
  "IS Core- Technology Solutioning",
  "IS Core- Software Design And Development",
  "IS Core- Project Experience",
  "IS Elective",
  "Uni Core",
  "IS Product Development Electives",
  "IS Product Development Core",
] as const;

export type BasketType = (typeof baskets)[number];

export const basketCodes = [
  "IS",
  "CS",
  "SE",
  "COR",
  "DSA",
  "COR-CS",
  "COR-IS",
  "COR-STAT",
  "COR-MGMT",
  "COR-COMM",
  "COR-OBHR",
  "ECON-",
  "CORE-",
  "COR-LAW",
  "COR-MLAY",
  "COR-XXXX",
  "COR-PPPM",
] as const;
export type BasketCode = (typeof basketCodes)[number];

export type Basket<T extends Track | undefined> = {
  name: BasketType;
  basketCode: BasketCode;
  modules: ModuleCode[];
  required: number;
  trackSpecific?: T;
};
