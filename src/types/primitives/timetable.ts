import type { Module } from "./module";

export const startingTime = [
  "8:15",
  "10:00",
  "12:00",
  "13:45",
  "3:30",
  "5:15",
  "7:00",
  "8:45",
] as const;
export const duration = [1.5, 3] as const;

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;
export type Day = (typeof days)[number];

export type StartingTime = (typeof startingTime)[number];
export type Duration = (typeof duration)[number];

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

export const defaultTimetable: Timetable = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
};
