import type { Term } from "../planner";
import type { Module } from "./module";

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

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;
export type Day = (typeof days)[number];

export type ClassTime = {
  day: Day;
  startTime: StartingTime;
  duration: Duration;
};

export type Class = {
  module: Module;
  section: string;
  classTime: ClassTime;
};

export type ColorIndex = number;

type Modifiable = {
  isModifiable?: boolean;
  isAvailable?: boolean;
  isActive?: boolean;
  colorIndex: ColorIndex;
};

export type ModifiableClass = Class & Modifiable;

export type Timetable = Record<Day, ModifiableClass[]>;

export type TimetableMap = Record<Term, Timetable>;

export const defaultTimetable: Timetable = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
};

export const defaultTimetableMap: TimetableMap = {
  "Term 1": defaultTimetable,
  "Term 2": defaultTimetable,
  "Term 3A": defaultTimetable,
  "Term 3B": defaultTimetable,
};
