import type { Module, Section } from "@/types/primitives/module";
import {
  days,
  type ModifiableClass,
  type Timetable,
} from "@/types/primitives/timetable";
import { toast } from "sonner";
import { TIMETABLE_THEMES, TimetableThemeName } from "./colours";

export function findFreeColorIndex(
  timetable: Timetable,
  theme: TimetableThemeName,
) {
  for (let i = 0; i < timetable.modules.length; i++) {
    if (!timetable.modules.find((m) => m.colorIndex === i)) {
      return i;
    }
  }
  return timetable.modules.length % TIMETABLE_THEMES[theme].length;
}

export function addModuleToTimetable(
  module: Module,
  timetable: Timetable,
  theme: TimetableThemeName,
): Timetable {
  const updatedTimetable = JSON.parse(JSON.stringify(timetable)) as Timetable;
  const section = module.sections[0];
  if (!section) {
    toast.error("No sections available for this module");
    return updatedTimetable;
  }
  const colorIndex = findFreeColorIndex(timetable, theme);
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
  updatedTimetable.modules.push({
    ...module,
    colorIndex,
  });
  return updatedTimetable;
}

export function showAllSections(
  module: Module,
  timetable: Timetable,
  theme: TimetableThemeName,
  currentSectionCode?: Section["code"],
): Timetable {
  const updatedTimetable = JSON.parse(JSON.stringify(timetable)) as Timetable;
  const tmp = timetable.modules.find((m) => m.moduleCode === module.moduleCode);
  module.sections.forEach((section) => {
    section.classes.forEach((classTime) => {
      updatedTimetable[classTime.day] = updatedTimetable[classTime.day].filter(
        (c) => c.moduleCode !== module.moduleCode,
      );
    });
  });
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
          colorIndex: tmp?.colorIndex ?? findFreeColorIndex(timetable, theme),
        };
      } else {
        modifiableClass = {
          moduleCode: module.moduleCode,
          section: section.code,
          classTime,
          isModifiable: true,
          isAvailable: true,
          isActive: false,
          colorIndex: tmp?.colorIndex ?? findFreeColorIndex(timetable, theme),
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
  const updatedTimetable = JSON.parse(JSON.stringify(timetable)) as Timetable;

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
