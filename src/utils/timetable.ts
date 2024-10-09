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
      moduleCode: module.moduleCode,
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
          moduleCode: module.moduleCode,
          section: section.code,
          classTime,
          isModifiable: true,
          isAvailable: true,
          isActive: true,
          colorIndex,
        };
      } else {
        modifiableClass = {
          moduleCode: module.moduleCode,
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
        classItem.moduleCode !== module.moduleCode ||
        (classItem.section === selectedSectionCode &&
          classItem.moduleCode === module.moduleCode),
    );
  });

  return updatedTimetable;
}

export function getClassEndTime(startTime: string, duration: number) {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours! * 60 + minutes! + duration;
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;
  return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
}
