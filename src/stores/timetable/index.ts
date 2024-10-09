import type { Term } from "@/types/planner";
import type { Module, ModuleCode, Section } from "@/types/primitives/module";
import {
  type ColorIndex,
  defaultTimetableMap,
  type TimetableMap,
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
  AddModuleToTimetable: (moduleCode: ModuleCode, term: Term) => Promise<void>;
  removeModuleFromTimetable: (
    moduleCode: ModuleCode,
    sectionCode: string,
    term: Term,
  ) => void;
  selectSection: (
    moduleCode: ModuleCode,
    sectionCode: string,
    term: Term,
  ) => void;
  showAllSections: (
    moduleCode: ModuleCode,
    colorIndex: ColorIndex,
    term: Term,
    currentSectionCode?: Section["code"],
  ) => void;
};

export type TimetableStore = {
  timetableMap: TimetableMap;
  modules: Module[];
} & TimetableActions;

export const createTimetableStore = (
  initTimetableMap: TimetableMap = defaultTimetableMap,
) => {
  return create<TimetableStore>()(
    persist(
      (set, get) => ({
        timetableMap: initTimetableMap,
        modules: [],
        AddModuleToTimetable: async (moduleCode: ModuleCode, term: Term) => {
          const { getModule } = useModuleBankStore((state) => state);
          const module = await getModule(moduleCode);
          const timetable = get().timetableMap[term];
          const newTimeTable = addModuleToTimetable(module, timetable, 0);
          set((state) => ({
            ...state,
            timetableMap: { ...state.timetableMap, [term]: newTimeTable },
            modules: [...state.modules, module],
          }));
        },
        removeModuleFromTimetable: (
          moduleCode: ModuleCode,
          sectionCode: string,
          term: Term,
        ) => {
          const module = get().modules.find((m) => m.moduleCode === moduleCode);
          if (!module) {
            toast.error("Module not found");
            return;
          }
          const timetable = get().timetableMap[term];
          const updatedTimetable = { ...timetable };
          module.sections.forEach((section) => {
            if (section.code === sectionCode) {
              section.classes.forEach((classTime) => {
                updatedTimetable[classTime.day] = updatedTimetable[
                  classTime.day
                ].filter(
                  (c) =>
                    c.module.moduleCode !== moduleCode ||
                    c.section !== sectionCode,
                );
              });
            }
          });
          set((state) => ({
            ...state,
            timetableMap: {
              ...state.timetableMap,
              [term]: updatedTimetable,
            },
            modules: state.modules.filter((m) => m.moduleCode !== moduleCode),
          }));
        },
        showAllSections: (
          moduleCode: ModuleCode,
          colorIndex: ColorIndex,
          term: Term,
          currentSectionCode?: Section["code"],
        ) => {
          const module = get().modules.find((m) => m.moduleCode === moduleCode);
          if (!module) {
            toast.error("Module not found");
            return;
          }
          const timetable = get().timetableMap[term];
          const newTimeTable = showAllSections(
            module,
            timetable,
            colorIndex,
            currentSectionCode,
          );
          set((state) => ({
            ...state,
            timetableMap: {
              ...state.timetableMap,
              [term]: newTimeTable,
            },
          }));
        },
        selectSection: (
          moduleCode: ModuleCode,
          sectionCode: string,
          term: Term,
        ) => {
          const module = get().modules.find((m) => m.moduleCode === moduleCode);
          if (!module) {
            toast.error("Module not found");
            return;
          }
          const timetable = get().timetableMap[term];
          const newTimeTable = selectSection(module, timetable, sectionCode);
          set((state) => ({
            ...state,
            timetableMap: {
              ...state.timetableMap,
              [term]: newTimeTable,
            },
          }));
        },
      }),
      {
        name: "timetable",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
