import type { ModuleBank } from "@/types/banks/moduleBank";
import {
  defaultPlanner,
  defaultPlannerState,
  type Planner,
  type PlannerState,
  type Term,
  type Year,
} from "@/types/planner";
import type { ModuleCode } from "@/types/primitives/module";
import { getPlanner } from "@/utils/planner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type PlannerActions = {
  addModule: (
    moduleCode: ModuleCode,
    attributes: {
      id: string;
      year: Year;
      term: Term;
    },
    moduleBank: ModuleBank,
  ) => void;
  changeTerm: (
    srcYear: Year,
    srcTerm: Term,
    destYear: Year,
    destTerm: Term,
    moduleCode: ModuleCode,
    moduleBank: ModuleBank,
  ) => void;
  removeModule: (moduleCode: ModuleCode, year: Year, term: Term, moduleBank: ModuleBank) => void;
  hideSpecial: (year: Year) => void;
  // removeTerm: (year: Year, term: Term, moduleBank: ModuleBank) => void;
  // removeYear: (year: Year, moduleBank: ModuleBank) => void;
  iSync: (plannerState: PlannerState, planner: Planner) => void;
};

export type PlannerStore = {
  plannerState: PlannerState;
  planner: Planner;
  isSpecialHidden: Record<Year, boolean>;
} & PlannerActions;

export const createPlannerBank = (
  initPlannerState: PlannerState = defaultPlannerState,
  initPlanner: Planner = defaultPlanner,
) => {
  return create<PlannerStore>()(
    persist(
      (set, get) => ({
        plannerState: initPlannerState,
        planner: initPlanner,
        isSpecialHidden: {
          1: false, 
          2: false, 
          3: false, 
          4: false, 
        },
        addModule: (moduleCode, attributes, moduleBank) => {
          const original = get();
          if (original.plannerState.modules[moduleCode]) return;
          const newPlannerState: PlannerState = {
            ...original.plannerState,
            modules: {
              ...original.plannerState.modules,
              [moduleCode]: {
                year: attributes.year,
                term: attributes.term,
                moduleCode,
              },
            },
          };

          set({
            plannerState: newPlannerState,
            planner: getPlanner(newPlannerState.modules, moduleBank),
          });
        },
        changeTerm: (
          srcYear,
          srcTerm,
          destYear,
          destTerm,
          moduleCode,
          moduleBank,
        ) => {
          const original = get();
          const module = original.plannerState.modules[moduleCode];
          if (!module) return;

          set((state) => {
            const updatedModule = {
              ...module,
              year: destYear,
              term: destTerm,
            };

            const newPlannerState: PlannerState = {
              ...state.plannerState,
              modules: {
                ...state.plannerState.modules,
                [moduleCode]: updatedModule,
              },
            };

            const stateTemp = {
              planner: getPlanner(newPlannerState.modules, moduleBank),
              plannerState: newPlannerState,
              isSpecialHidden: state.isSpecialHidden,
            };

            delete stateTemp.planner[srcYear][srcTerm][moduleCode];

            return stateTemp;
          });
        },
        removeModule: (moduleCode, year, term, moduleBank) => {
          console.log(year)
          set((state) => {
            const original = state.plannerState;
            const module = original.modules[moduleCode];

            if (!module) return state;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [moduleCode]: _, ...remainingModules } = original.modules;

            const temp = {
              plannerState: {
                ...original,
                modules: remainingModules,
              },
              planner: getPlanner(state.plannerState.modules, moduleBank),
              isSpecialHidden: state.isSpecialHidden,
            };
            delete temp.planner[year][term][moduleCode];
            return temp;
          });
        },
        hideSpecial: (year: Year) => {
          set((state) => {
            const currentHiddenState = state.isSpecialHidden[year]; 
            return {
              ...state,
              isSpecialHidden: {
                ...state.isSpecialHidden,
                [year]: !currentHiddenState,
              },
            };
          });
        },
        
        // removeYear: (year: Year, moduleBank: ModuleBank) => {
        //   set((state: { plannerState: PlannerState; planner: Planner }) => {
        //     const newModules = removeModulesFromPlannerState(
        //       state.plannerState.modules,
        //       (_, module) => module.year === year,
        //     );

        //     const newPlanner= getPlanner(newModules, moduleBank);
        //     console.log(newPlanner)

        //     newPlanner[year]= defaultPlanner[year]

        //     return {
        //       plannerState: {
        //         ...state.plannerState,
        //         modules: newModules,
        //       },
        //       planner: newPlanner,
        //     };
        //   });
        // },
        // removeTerm: (year: Year, term: Term, moduleBank: ModuleBank) => {
        //   set((state: { plannerState: PlannerState; planner: Planner }) => {
        //     const newModules = removeModulesFromPlannerState(
        //       state.plannerState.modules,
        //       (_, module) => module.year === year && module.term === term,
        //     );

        //     const newPlanner = JSON.parse(
        //       JSON.stringify(state.planner),
        //     ) as Planner;
        //     if (newPlanner[year]) {
        //       delete newPlanner[year][term];
        //       if (Object.keys(newPlanner[year]).length === 0) {
        //         delete newPlanner[year];
        //       }
        //     }

        //     return {
        //       plannerState: {
        //         ...state.plannerState,
        //         modules: newModules,
        //       },
        //       planner: getPlanner(newModules, moduleBank),
        //     };
        //   });
        // },
        iSync: (plannerState, planner) => {
          set({
            plannerState,
            planner,
          });
        },
      }),
      {
        name: "planner",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};

export const removeModulesFromPlannerState = (
  modules: PlannerState["modules"],
  predicate: (moduleCode: string, module: any) => boolean,
) => {
  return Object.fromEntries(
    Object.entries(modules).filter(
      ([moduleCode, module]) => !predicate(moduleCode, module),
    ),
  );
};
