import type { BasketCode } from "./basket";
import type { ClassTime } from "./timetable";

export type ModuleCode = `${BasketCode}${number}${string}`;

export type Module = {
  name: string;
  moduleCode: ModuleCode;
  exam: Exam;
  description: string;
  sections: Section[];
  coRequisite?: PreReqTree[];
  mutuallyExclusive?: ModuleCode[];
  credit: number;
  offeredSem: Term[];
  preReq?: PreReqTree;
};

export type PreReqTree =
  | ModuleCode
  | { and: PreReqTree[] }
  | { or: PreReqTree[] }
  | { nOf: [number, PreReqTree[]] };

export const terms = ["Term 1", "Term 2", "Term 3A", "Term 3B"] as const;
export type Term = (typeof terms)[number];

export type Section = {
  code: string;
  professor: Professor;
  location: Location;
  classes: ClassTime[];
};

export type Exam = {
  dateTime: Date;
};

export type Professor = {
  name: string;
};

export type Location = {
  building: string;
  room: string;
  level: number | `B-${number}`;
};
