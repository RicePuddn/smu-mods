import { Track } from "./major";
import { ModuleCode } from "./module";

export type BasketCode =
  | "IS"
  | "CS"
  | "SE"
  | "COR"
  | "DSA"
  | "COR-CS"
  | "COR-IS"
  | "COR-STAT";

export type Basket<T extends Track | undefined> = {
  name: string;
  basketCode: BasketCode;
  modules: ModuleCode[];
  required: number;
  trackSpecific: T;
};
