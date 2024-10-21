import type { Term } from "@/types/planner";
import type { Module, ModuleCode, Section } from "@/types/primitives/module";
import {
  defaultTimetableMap,
  type Timetable,
  type TimetableMap,
} from "@/types/primitives/timetable";
import { TimetableThemeName } from "@/utils/timetable/colours";
import {
  addModuleToTimetable,
  selectSection,
  showAllSections,
} from "@/utils/timetable/timetable";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TimetableActions = {
  AddModuleToTimetable: (
    module: Module,
    term: Term,
    theme: TimetableThemeName,
  ) => Promise<void>;
  removeModuleFromTimetable: (moduleCode: ModuleCode, term: Term) => void;
  selectSection: (
    moduleCode: ModuleCode,
    sectionCode: string,
    term: Term,
  ) => void;
  showAllSections: (
    moduleCode: ModuleCode,
    term: Term,
    theme: TimetableThemeName,
    currentSectionCode?: Section["code"],
  ) => void;
  iSync: (data: TimetableMap) => void;
};

export type TimetableStore = {
  timetableMap: TimetableMap;
} & TimetableActions;

export const createTimetableStore = (
  initTimetableMap: TimetableMap = defaultTimetableMap,
) => {
  return create<TimetableStore>()(
    persist(
      (set, get) => ({
        timetableMap: initTimetableMap,
        AddModuleToTimetable: async (
          module: Module,
          term: Term,
          theme: TimetableThemeName,
        ) => {
          const timetable = get().timetableMap[term];
          if (timetable.modules.length > 7) {
            toast.error("Maximum of 8 modules allowed");
            return;
          }
          const newTimeTable = addModuleToTimetable(module, timetable, theme);
          set((state) => ({
            ...state,
            timetableMap: { ...state.timetableMap, [term]: newTimeTable },
          }));
        },
        removeModuleFromTimetable: (moduleCode: ModuleCode, term: Term) => {
          const module = get().timetableMap[term].modules.find(
            (m) => m.moduleCode === moduleCode,
          );
          if (!module) {
            toast.error("Module not found");
            return;
          }
          const timetable = get().timetableMap[term];
          const updatedTimetable = JSON.parse(
            JSON.stringify(timetable),
          ) as Timetable;
          module.sections.forEach((section) => {
            section.classes.forEach((classTime) => {
              updatedTimetable[classTime.day] = updatedTimetable[
                classTime.day
              ].filter((c) => c.moduleCode !== moduleCode);
            });
          });
          updatedTimetable.modules = updatedTimetable.modules.filter(
            (mod) => mod.moduleCode !== moduleCode,
          );
          set((state) => ({
            ...state,
            timetableMap: {
              ...state.timetableMap,
              [term]: updatedTimetable,
            },
          }));
        },
        showAllSections: (
          moduleCode: ModuleCode,
          term: Term,
          theme: TimetableThemeName,
          currentSectionCode?: Section["code"],
        ) => {
          const module = get().timetableMap[term].modules.find(
            (m) => m.moduleCode === moduleCode,
          );
          if (!module) {
            toast.error("Module not found");
            return;
          }
          const timetable = get().timetableMap[term];
          const newTimeTable = showAllSections(
            module,
            timetable,
            theme,
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
          const module = get().timetableMap[term].modules.find(
            (m) => m.moduleCode === moduleCode,
          );
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
        iSync: (data: TimetableMap) => {
          set((state) => ({
            ...state,
            timetableMap: data,
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
