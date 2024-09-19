import type { Module, ModuleCode, Section } from "@/types/primitives/module";
import {
  type ColorIndex,
  defaultTimetable,
  type Timetable,
} from "@/types/primitives/timetable";
import {
  addModuleToTimetable,
  selectSection,
  showAllSections,
} from "@/utils/timetable";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useModuleBankStore } from "../moduleBank/provider";

export type TimetableActions = {
  AddModuleToTimetable: (moduleCode: ModuleCode) => Promise<void>;
  selectSection: (moduleCode: ModuleCode, sectionCode: string) => void;
  showAllSections: (
    moduleCode: ModuleCode,
    colorIndex: ColorIndex,
    currentSectionCode?: Section["code"],
  ) => void;
};

export type TimetableStore = {
  timetable: Timetable;
  modules: Module[];
} & TimetableActions;

export const createTimetableStore = (
  initTimetable: Timetable = defaultTimetable,
) => {
  return create<TimetableStore>()(
    persist(
      (set, get) => ({
        timetable: initTimetable,
        modules: [],
        AddModuleToTimetable: async (moduleCode: ModuleCode) => {
          const { getModule } = useModuleBankStore((state) => state);
          const module = await getModule(moduleCode);
          const timetable = get().timetable;
          const newTimeTable = addModuleToTimetable(module, timetable, 0);
          set({ timetable: newTimeTable });
          set((state) => ({ ...state, modules: [...state.modules, module] }));
        },
        showAllSections: (
          moduleCode: ModuleCode,
          colorIndex: ColorIndex,
          currentSectionCode?: Section["code"],
        ) => {
          const module = get().modules.find((m) => m.moduleCode === moduleCode);
          if (!module) {
            toast.error("Module not found");
            return;
          }
          const timetable = get().timetable;
          const newTimeTable = showAllSections(
            module,
            timetable,
            colorIndex,
            currentSectionCode,
          );
          set({ timetable: newTimeTable });
        },
        selectSection: (moduleCode: ModuleCode, sectionCode: string) => {
          const module = get().modules.find((m) => m.moduleCode === moduleCode);
          if (!module) {
            toast.error("Module not found");
            return;
          }
          const timetable = get().timetable;
          const newTimeTable = selectSection(module, timetable, sectionCode);
          set({ timetable: newTimeTable });
        },
      }),
      {
        name: "timetable",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
