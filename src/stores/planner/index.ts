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
import { getPlannerModuleInfo } from "@/utils/planner";
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
  removeModule: (moduleCode: ModuleCode) => void;
  removeYear: (yearToRemove: Year)=> void;
};

export type PlannerStore = {
  plannerState: PlannerState;
  planner: Planner;
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
        addModule: (moduleCode, attributes, moduleBank) => {
          const original = get();
          if (original.plannerState.modules[moduleCode]) return;
          set({
            plannerState: {
              ...original.plannerState,
              modules: {
                ...original.plannerState.modules,
                [moduleCode]: {
                  id: attributes.id,
                  year: attributes.year,
                  term: attributes.term,
                  moduleCode,
                },
              },
            },
            planner: {
              ...original.planner,
              [attributes.year]: {
                ...original.planner[attributes.year],
                [attributes.term]: {
                  ...original.planner[attributes.year][attributes.term],
                  [moduleCode]: getPlannerModuleInfo(
                    {
                      id: moduleCode,
                      year: attributes.year,
                      term: attributes.term,
                      moduleCode,
                    },
                    moduleBank,
                  ),
                },
              },
            },
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
            const newPlanner = JSON.parse(
              JSON.stringify(state.planner),
            ) as Planner;

            if (newPlanner[srcYear][srcTerm]) {
              delete newPlanner[srcYear][srcTerm][moduleCode];
            }

            if (!newPlanner[destYear][destTerm]) {
              newPlanner[destYear][destTerm] = {};
            }
            newPlanner[destYear][destTerm][moduleCode] = getPlannerModuleInfo(
              module,
              moduleBank,
            );

            const updatedModule = {
              ...module,
              year: destYear,
              term: destTerm,
            };

            return {
              planner: newPlanner,
              plannerState: {
                ...state.plannerState,
                modules: {
                  ...state.plannerState.modules,
                  [moduleCode]: updatedModule,
                },
              },
            };
          });
        },
        removeModule: (moduleCode) => {
          const original = get().plannerState;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [moduleCode]: _, ...modules } = original.modules;
          set({
            plannerState: {
              ...original,
              modules,
            },
          });
        },
        removeYear: (yearToRemove) => {
          set((state) => {
            const newPlanner = { ...state.planner };
            const newPlannerState = { ...state.plannerState };

            if (yearToRemove in newPlanner) {
              delete newPlanner[yearToRemove];

              newPlannerState.modules = Object.fromEntries(
                Object.entries(newPlannerState.modules).filter(
                  ([_, module]) => module.year !== yearToRemove
                )
              );

              // If all years removed (except exemption), reset to default
              const remainingYears = Object.keys(newPlanner).filter(year => year !== '-1');
              if (remainingYears.length === 0) {
                return {
                  planner: defaultPlanner,
                  plannerState: defaultPlannerState
                };
              }
            }
            return {
              planner: newPlanner,
              plannerState: newPlannerState
            };
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
