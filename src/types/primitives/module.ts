import type { Term } from "../planner";
import type { BasketCode } from "./basket";
import type { ClassTime } from "./timetable";

export type ModuleCode = `${BasketCode}${number}${string}`;

export type Module = {
  name: string;
  moduleCode: ModuleCode;
  exam?: Exam;
  description: string;
  sections: Section[];
  coRequisite?: PreReqTree[];
  mutuallyExclusive?: ModuleCode[];
  credit: number;
  terms: Term[];
  preReq?: PreReqTree;
};

export type PreReqTree =
  | ModuleCode
  | { and: PreReqTree[] }
  | { or: PreReqTree[] }
  | { nOf: [number, PreReqTree[]] };

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
