import type { BasketCode } from "./basket";

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

export const startingTime = [
  "08:15",
  "10:00",
  "12:00",
  "13:45",
  "15:30",
  "17:15",
  "19:00",
  "20:45",
] as const;
export const duration = [1.5, 3.25] as const;

export type StartingTime = (typeof startingTime)[number];
export type Duration = (typeof duration)[number];

export type Section = {
  code: string;
  professor: Professor;
  location: Location;
  startTime: StartingTime;
  duration: Duration;
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
