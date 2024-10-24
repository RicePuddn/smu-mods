import type { AddToCalendarActionType } from "add-to-calendar-button-react";
import { toast } from "sonner";

import type { Term } from "@/types/planner";
import type { Module, ModuleCode, Section } from "@/types/primitives/module";
import type {
  Day,
  ModifiableClass,
  Timetable,
} from "@/types/primitives/timetable";
import { APP_CONFIG } from "@/config";
import { modules } from "@/server/data/moduleBank";
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
  // Parse the startTime into hours and minutes
  const [hoursStr, minutesStr] = startTime.split(":");
  const startHours = Number(hoursStr);
  const startMinutes = Number(minutesStr);

  // Validate the parsed hours and minutes
  if (
    isNaN(startHours) ||
    isNaN(startMinutes) ||
    startHours < 0 ||
    startHours >= 24 ||
    startMinutes < 0 ||
    startMinutes >= 60
  ) {
    throw new Error(`Invalid startTime: ${startTime}`);
  }

  // Validate the duration
  if (isNaN(duration) || duration < 0) {
    throw new Error(`Invalid duration: ${duration}`);
  }

  // Convert duration in hours to minutes
  const durationMinutes = duration * 60;

  // Calculate the total minutes and handle overflow
  let totalMinutes = startHours * 60 + startMinutes + durationMinutes;

  // Since totalMinutes may not be an integer due to fractional durations, round to the nearest minute
  totalMinutes = Math.round(totalMinutes);

  // Wrap around after 24 hours (1440 minutes)
  totalMinutes = totalMinutes % 1440;

  // Convert total minutes back to hours and minutes
  let endHours = Math.floor(totalMinutes / 60);
  let endMinutes = totalMinutes % 60;

  // Handle cases where endMinutes equals 60 after rounding
  if (endMinutes === 60) {
    endMinutes = 0;
    endHours = (endHours + 1) % 24;
  }

  // Format the end time with leading zeros if necessary
  const formattedHours = String(endHours).padStart(2, "0");
  const formattedMinutes = String(endMinutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

export function getCalendarFormat(
  timetable: Timetable,
): AddToCalendarActionType["dates"] {
  const { termStartMonday, termEndSunday } = APP_CONFIG;

  const result: AddToCalendarActionType["dates"] = [];

  const termStartDate = new Date(termStartMonday);
  const termEndDate = new Date(termEndSunday);

  // Array to map JavaScript's getDay() index to day names
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date(termStartDate);

  while (currentDate <= termEndDate) {
    const dayIndex = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const dayName = dayNames[dayIndex]; // Get the day name

    // Check if the day is in our timetable (Monday to Saturday)
    if (days.includes(dayName as Day)) {
      const classes = timetable[dayName as Day];
      if (classes) {
        for (const modClass of classes) {
          const { moduleCode, classTime } = modClass;
          const { startTime } = classTime;
          const endTime = getClassEndTime(startTime, classTime.duration);

          // Calculate week number
          const timeDifference =
            currentDate.getTime() - termStartDate.getTime();
          const weekNo =
            Math.floor(timeDifference / (7 * 24 * 60 * 60 * 1000)) + 1;

          // Format date to YYYY-MM-DD
          const startDate = currentDate.toISOString().split("T")[0];

          const section = modules[moduleCode]?.sections.find(
            (section) => section.code === modClass.section,
          );
          // Add the class event to the result
          result.push({
            startDate,
            startTime,
            endTime,
            name: `[${moduleCode}] ${section?.location.building + " " + section?.location.room} Week ${weekNo}`,
          });
        }
      }
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}
