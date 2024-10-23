import { JSDOM } from "jsdom";

import {
  Exam,
  Location,
  Module,
  ModuleCode,
  Professor,
  Section,
} from "@/types/primitives/module";
import {
  ClassTime,
  Day,
  Duration,
  StartingTime,
} from "@/types/primitives/timetable";
import { getClassDuration } from "@/utils/getClassDuration";

export function parseModuleHtml(html: string): Partial<Module> {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const moduleFullName = document
    .querySelector(".rgGroupHeader td:nth-child(2) p")
    ?.textContent?.trim();

  const moduleCode = moduleFullName?.split(" ")[0];
  const moduleName = moduleFullName?.split("-")[1]?.trim();

  const sections: Section[] = [];
  const rows = document.querySelectorAll(".rgRow[id^='mtpRow']");
  const classes = Array.from(document.querySelectorAll("td")).filter((td) => {
    const firstChild = td.firstElementChild;
    return firstChild?.tagName === "SPAN" && firstChild.id.endsWith("_Label18");
  });
  const sectionElements = document.querySelectorAll("a[id$='_HyperLink2']");
  const credit = document.querySelector("[id$='_Label5']");
  rows.forEach((row, index) => {
    const sectionCode = sectionElements.item(index).textContent || "";
    const classInfo = classes[index];

    if (classInfo) {
      const classRows = classInfo.querySelectorAll("tr.rgRow");

      const classTimes: ClassTime[] = [];

      const locationText =
        classRows[0]?.querySelector("td:nth-child(7)")?.textContent?.trim() ||
        "";

      const locationParts = locationText.split(" ");
      const location: Location = {
        building: locationParts[0] ?? "",
        room: locationParts.slice(1).join(" ") ?? "",
        level:
          locationParts[3]?.[0] == "B"
            ? "B1"
            : parseInt(locationParts[3]?.[0] ?? "0"),
      };
      const professorName =
        row.querySelector("td:nth-child(8)")?.textContent?.trim() || "";
      const professor: Professor = { name: professorName };
      classRows.forEach((classRow) => {
        const cells = classRow.querySelectorAll("td");
        if (cells.length >= 8) {
          const day = cells[3]?.textContent?.trim();
          if (!day) {
            return;
          }
          const startTime = cells[4]?.textContent?.trim() || "08:15";
          const endTime = cells[5]?.textContent?.trim() || "";

          classTimes.push({
            day: getFullDay(day),
            startTime: startTime as StartingTime,
            duration: getClassDuration(startTime, endTime) as Duration,
          });
        }
      });
      sections.push({
        code: sectionCode,
        professor,
        location,
        classes: classTimes,
      });
    }
  });

  // Extracting exam details
  const examRow = document.querySelector(".rgAltRow");
  let exam: Exam | undefined;
  if (examRow) {
    const cells = examRow.querySelectorAll("td");
    if (cells.length >= 8) {
      const dateTime = new Date(
        `${cells[1]?.textContent?.trim()} ${cells[4]?.textContent?.trim()}`,
      );
      const durationInHour =
        (new Date(
          `${cells[2]?.textContent?.trim()} ${cells[5]?.textContent?.trim()}`,
        ).getTime() -
          dateTime.getTime()) /
        3600000;

      if (dateTime && durationInHour) {
        exam = {
          dateTime,
          durationInHour,
        };
      }
    }
  }

  return {
    name: moduleName ?? "Unknown",
    moduleCode: (moduleCode ?? "IS000") as ModuleCode,
    sections,
    exam,
    credit: parseInt(credit?.textContent?.trim().split(" ")[0] ?? "0"),
  };
}

export function getFullDay(input: string): Day {
  const dayMap: { [key: string]: Day } = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
  };

  const fullDay = dayMap[input.slice(0, 3)];
  if (fullDay) {
    return fullDay;
  } else {
    throw new Error(`Invalid day input: ${input}`);
  }
}
