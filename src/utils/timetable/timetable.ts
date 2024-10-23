import { toast } from "sonner";

import type { Term } from "@/types/planner";
import type { Module, ModuleCode, Section } from "@/types/primitives/module";
import type {
  Day,
  ModifiableClass,
  Timetable,
} from "@/types/primitives/timetable";
import { days } from "@/types/primitives/timetable";

import type { TimetableThemeName } from "./colours";
import { TIMETABLE_THEMES } from "./colours";

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

export function toggleVisibility(moduleCode: ModuleCode, timetable: Timetable) {
  const updatedTimetable = JSON.parse(JSON.stringify(timetable)) as Timetable;
  const findModuleIndex = updatedTimetable.modules.findIndex(
    (m) => m.moduleCode === moduleCode,
  );
  const findModule = updatedTimetable.modules[findModuleIndex];
  if (!findModule) {
    toast.error("Module not found");
    return updatedTimetable;
  }
  const newVisibility = !findModule.visible;
  updatedTimetable.modules[findModuleIndex]!.visible = newVisibility;
  Object.keys(updatedTimetable)
    .filter((key) => key !== "modules")
    .forEach((day) => {
      updatedTimetable[day as Day] = updatedTimetable[day as Day].map(
        (classItem) => {
          if (classItem.moduleCode === moduleCode) {
            return {
              ...classItem,
              visible: newVisibility,
            };
          }
          return classItem;
        },
      );
    });
  return updatedTimetable;
}

export function changeColorOfModule(
  moduleCode: ModuleCode,
  timetable: Timetable,
  colorIndex: number,
) {
  const updatedTimetable = JSON.parse(JSON.stringify(timetable)) as Timetable;
  const findModuleIndex = updatedTimetable.modules.findIndex(
    (m) => m.moduleCode === moduleCode,
  );
  const findModule = updatedTimetable.modules[findModuleIndex];
  if (!findModule) {
    toast.error("Module not found");
    return updatedTimetable;
  }
  updatedTimetable.modules[findModuleIndex]!.colorIndex = colorIndex;
  Object.keys(updatedTimetable)
    .filter((key) => key !== "modules")
    .forEach((day) => {
      updatedTimetable[day as Day] = updatedTimetable[day as Day].map(
        (classItem) => {
          if (classItem.moduleCode === moduleCode) {
            return {
              ...classItem,
              colorIndex,
            };
          }
          return classItem;
        },
      );
    });
  return updatedTimetable;
}

export function addModuleToTimetable(
  module: Module,
  timetable: Timetable,
  theme: TimetableThemeName,
  term: Term,
): Timetable {
  const updatedTimetable = JSON.parse(JSON.stringify(timetable)) as Timetable;
  const section = module.sections[0];
  if (!section) {
    toast.error("No sections available for this module");
    return updatedTimetable;
  }
  const findModule = updatedTimetable.modules.findIndex(
    (m) => m.moduleCode === module.moduleCode,
  );
  if (findModule !== -1) {
    toast.error(`${module.moduleCode} already added to timetable`);
    return updatedTimetable;
  }
  if (!module.terms.includes(term)) {
    toast.warning(`${module.moduleCode} not offered in ${term}`);
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
      isVisible: true,
    };
    if (!updatedTimetable[classTime.day]) {
      updatedTimetable[classTime.day] = [];
    }

    updatedTimetable[classTime.day].push(modifiableClass);
  });
  updatedTimetable.modules.push({
    ...module,
    colorIndex,
    visible: true,
  });
  toast.success(`${module.moduleCode} added to timetable`);
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
          isVisible: tmp?.visible ?? true,
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
          isVisible: tmp?.visible ?? true,
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
