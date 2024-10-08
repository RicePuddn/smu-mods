import type { Track } from "./major";
import type { ModuleCode } from "./module";

export const basketCodes = [
  "IS",
  "CS", 
  "SE",
  "COR-",
  "DSA",
  "COR-CS",
  "COR-IS",
  "COR-STAT",
  "COR-MGMT",
  "COR-COMM",
  "	COR-OBHR",
  "ECON-",
  "CORE-",
  "COR-LAW",
  "COR-MLAY",

] as const
export type BasketCode = (typeof basketCodes)[number]

export type Basket<T extends Track | undefined> = {
  name: string;
  basketCode: BasketCode;
  modules: ModuleCode[];
  required: number;
  trackSpecific: T;
};
