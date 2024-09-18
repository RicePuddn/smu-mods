import {
  defaultPlannerState,
  type PlannerState,
  type Term,
  type Year,
} from "@/types/planner";
import type { ModuleCode } from "@/types/primitives/module";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type PlannerActions = {
  AddModule: (
    moduleCode: ModuleCode,
    attributes: {
      id: string;
      year: Year;
      term: Term;
    },
  ) => void;
  removeModule: (moduleCode: ModuleCode) => void;
};

export type PlannerStore = { plannerState: PlannerState } & PlannerActions;

export const createPlannerBank = (
  initState: PlannerState = defaultPlannerState,
) => {
  return create<PlannerStore>()(
    persist(
      (set, get) => ({
        plannerState: initState,
        AddModule: (moduleCode, attributes) => {
          const original = get().plannerState;
          set({
            plannerState: {
              ...original,
              modules: {
                ...original.modules,
                [moduleCode]: {
                  id: attributes.id,
                  year: attributes.year,
                  term: attributes.term,
                  moduleCode,
                },
              },
            },
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
      }),
      {
        name: "planner",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
