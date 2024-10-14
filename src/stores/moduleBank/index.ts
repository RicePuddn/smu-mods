import type { ModuleBank } from "@/types/banks/moduleBank";
import type { Module, ModuleCode } from "@/types/primitives/module";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ModuleBankActions = {
  addModule: (module: Module) => void;
  getModule: (moduleCode: ModuleCode) => Promise<Module>;
  fetchAndAddModule: (moduleCode: ModuleCode) => Promise<Module>;
  toggleFavourites: (moduleCode: ModuleCode) => void;
  getFavouriteModules: () => ModuleCode[];
};

export type ModuleBankStore = { modules: ModuleBank, favouriteModules: ModuleCode[] } & ModuleBankActions;

export const defaultInitState: ModuleBank = {};
export const defaultFavouriteModules: ModuleCode[] = [];

export const createModuleBank = (initModuleBank: ModuleBank = defaultInitState, initFavouriteModules: ModuleCode[] = defaultFavouriteModules) => {
  return create<ModuleBankStore>()(
    persist(
      (set, get) => ({
        modules: initModuleBank,
        favouriteModules: initFavouriteModules,
        toggleFavourites: (moduleCode: ModuleCode) => {
          const originalFavourites = get().favouriteModules;
          const setFavourites = new Set(originalFavourites);
          if (setFavourites.has(moduleCode)) {
            setFavourites.delete(moduleCode);
          } else {
            setFavourites.add(moduleCode);
          }
          set((state) => {
            return {
              ...state,
              favouriteModules: Array.from(setFavourites),
            };
          });
        },
        getFavouriteModules: () => {
          const originalFavourites = get().favouriteModules;
          return originalFavourites
        },
        addModule: (module: Module) => {
          set((state) => {
            return {
              ...state,
              modules: {
                ...state.modules,
                [module.moduleCode]: module,
              },
            };
          });
        },
        getModule: async (moduleCode: ModuleCode) => {
          const state = get();
          if (state.modules[moduleCode]) {
            return state.modules[moduleCode];
          }
          return get().fetchAndAddModule(moduleCode);
        },
        fetchAndAddModule: async (moduleCode: ModuleCode) => {
          try {
            const res = await fetch(`/api/module/get?moduleCode=${moduleCode}`);
            const moduleData = (await res.json()) as Module;
            get().addModule(moduleData);
            return moduleData;
          } catch (error) {
            console.error(`Error fetching module ${moduleCode}:`, error);
            throw error;
          }
        },
      }),
      {
        name: "moduleBank",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
