import type { Module, Section } from "@/types/primitives/module";
import {
  type ColorIndex,
  days,
  type ModifiableClass,
  type Timetable,
} from "@/types/primitives/timetable";
import { toast } from "sonner";

export function addModuleToTimetable(
  module: Module,
  timetable: Timetable,
  colorIndex: ColorIndex,
): Timetable {
  const updatedTimetable = { ...timetable };
  const section = module.sections[0];
  if (!section) {
    toast.error("No sections available for this module");
    return updatedTimetable;
  }
  section.classes.forEach((classTime) => {
    const modifiableClass: ModifiableClass = {
      module,
      section: section.code,
      classTime,
      isModifiable: true,
      isAvailable: true,
      isActive: true,
      colorIndex,
    };
    if (!updatedTimetable[classTime.day]) {
      updatedTimetable[classTime.day] = [];
    }

    updatedTimetable[classTime.day].push(modifiableClass);
  });
  return updatedTimetable;
}

export function showAllSections(
  module: Module,
  timetable: Timetable,
  colorIndex: ColorIndex,
  currentSectionCode?: Section["code"],
): Timetable {
  const updatedTimetable = { ...timetable };

  module.sections.forEach((section) => {
    section.classes.forEach((classTime) => {
      let modifiableClass: ModifiableClass;
      if (section.code !== currentSectionCode) {
        modifiableClass = {
          module,
          section: section.code,
          classTime,
          isModifiable: true,
          isAvailable: true,
          isActive: true,
          colorIndex,
        };
      } else {
        modifiableClass = {
          module,
          section: section.code,
          classTime,
          isModifiable: true,
          isAvailable: true,
          isActive: false,
          colorIndex,
        };
      }

      if (!updatedTimetable[classTime.day]) {
        updatedTimetable[classTime.day] = [];
      }

      updatedTimetable[classTime.day].push(modifiableClass);
    });
  });

  return updatedTimetable;
}

export function selectSection(
  module: Module,
  timetable: Timetable,
  selectedSectionCode: string,
): Timetable {
  const updatedTimetable = { ...timetable };

  days.forEach((day) => {
    updatedTimetable[day] = updatedTimetable[day].filter(
      (classItem) =>
        classItem.module.moduleCode !== module.moduleCode ||
        (classItem.section === selectedSectionCode &&
          classItem.module.moduleCode === module.moduleCode),
    );
  });

  return updatedTimetable;
}
