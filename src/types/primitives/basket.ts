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

export type Basket<N extends number, T extends Track> = {
  name: string;
  basketCode: BasketCode;
  modules: ModuleCode[];
  requiredCredits: N;
  trackSpecific: T;
};
