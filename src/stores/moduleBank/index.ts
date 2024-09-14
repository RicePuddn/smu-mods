import { getModule } from "@/server/data/modules";
import type { ModuleBank } from "@/types/banks/moduleBank";
import type { Module, ModuleCode } from "@/types/primitives/module";
import { createStore } from "zustand/vanilla";

export type ModuleBankActions = {
  addModule: (module: Module) => void;
  getModule: (moduleCode: ModuleCode) => Module;
};

export type ModuleBankStore = ModuleBank & ModuleBankActions;

export const defaultInitState: ModuleBank = {};

export const createModuleBank = (initState: ModuleBank = defaultInitState) => {
  return createStore<ModuleBankStore>()((set) => ({
    ...initState,
    addModule: (module: Module) => {
      set((state) => {
        return {
          ...state,
          [module.moduleCode]: module,
        };
      });
    },
    getModule: (moduleCode: ModuleCode) => {
      if (!!initState[moduleCode]) {
        return initState[moduleCode];
      }
      const data = getModule(moduleCode);
      if (!data) {
        throw new Error(`Module ${moduleCode} not found`);
      }
      set((state) => {
        return {
          ...state,
          [moduleCode]: data,
        };
      });
      return data;
    },
  }));
};
