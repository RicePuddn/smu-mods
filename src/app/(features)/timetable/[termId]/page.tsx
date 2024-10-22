"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

import type { TermSlug, Year } from "@/types/planner";
import type { Term } from "@/types/planner";
import type { ModuleCode } from "@/types/primitives/module";
import type { Day, ModifiableClass } from "@/types/primitives/timetable";
import { SearchModule } from "@/components/SearchModule";
import { Button } from "@/components/ui/button";
import { PADDING } from "@/config";
import { cn } from "@/lib/utils";
import { useConfigStore } from "@/stores/config/provider";
import { useModuleBankStore } from "@/stores/moduleBank/provider";
import { usePlannerStore } from "@/stores/planner/provider";
import { useTimetableStore } from "@/stores/timetable/provider";
import { termMap, termSlug } from "@/types/planner";
import { timeSlots } from "@/types/primitives/timetable";
import { TIMETABLE_THEMES } from "@/utils/timetable/colours";

type ClassWithWidth = ModifiableClass & {
  width: number;
};

type FullClass = ClassWithWidth & {
  paddingLeft: number;
};

type Row = Record<number, ClassWithWidth[]>;

type FullRow = Record<number, FullClass[]>;

export default function TimeTablePage({
  params,
}: {
  params: { termId: string };
}) {
  const {
    timetableMap,
    AddModuleToTimetable,
    removeModuleFromTimetable,
    showAllSections,
    selectSection,
  } = useTimetableStore((state) => state);
  const { timetableTheme } = useConfigStore((state) => state);

  const { planner } = usePlannerStore((state) => state);

  const { modules } = useModuleBankStore((state) => state);

  const [selectedClass, setSelectedSection] = useState<FullClass>();

  const router = useRouter();
  const currentTermIdx = termSlug.indexOf(params.termId as TermSlug);
  const currentTermNum = termSlug[currentTermIdx]?.split("-")[1];
  const timetable = timetableMap[termMap[params.termId as TermSlug]];

  function calculateSlotLeftPadding(rows: Row, totalSlots: number): FullRow {
    const fullRows: FullRow = {};

    // Iterate through the row
    for (let rowIndex = 0; rowIndex < Object.keys(rows).length; rowIndex++) {
      const currentRow = rows[rowIndex];
      const updatedRow: FullClass[] = [];

      // Initialize previousClassEndMinutes to 08:00 for the first class inserted to the row

      let totalLeftOffset = 0;

      // let previousClassEndMinutes = timeToMinutes("08:00");
      for (let classIndex = 0; classIndex < currentRow!.length; classIndex++) {
        const currentClass = currentRow![classIndex];
        if (!currentClass) {
          continue;
        }
        const currentClassStartMinutes = timeToMinutes(
          currentClass.classTime.startTime,
        );

        let paddingLeft =
          ((currentClassStartMinutes - 480) / (60 * totalSlots)) * 100 -
          totalLeftOffset; // 480 mins = 08:00

        paddingLeft = Math.max(paddingLeft, 0);

        // If not the first class in the row, change previousClassEndTime to the previous class' actual endTime
        // if (classIndex != 0) {
        //   const previousClassEndTime = getClassEndTime(
        //     currentRow![classIndex - 1]!.classTime.startTime,
        //     currentRow![classIndex - 1]!.classTime.duration,
        //   );
        //   previousClassEndMinutes = timeToMinutes(previousClassEndTime);
        // }

        // const minutesDifference = currentClassMinutes - previousClassEndMinutes;
        // console.log(minutesDifference);

        // If the two slots are back to back, set padding to 0
        // let paddingLeft = 0;
        // if (minutesDifference > 0) {
        //   paddingLeft = (minutesDifference / (60 * totalSlots)) * 100;
        // }

        const durationInMinutes = currentClass.classTime.duration * 60;
        const width = (durationInMinutes / (60 * totalSlots)) * 100;

        totalLeftOffset += width + paddingLeft;

        const fullClass: FullClass = {
          ...currentClass,
          paddingLeft: totalLeftOffset - width,
          // width: width,
        };

        updatedRow.push(fullClass);

        console.log(updatedRow);

        // previousClassEndMinutes =
        //   currentClassStartMinutes + currentClass!.classTime.duration * 60;

        // let currentClassEndMinutes =
        //   currentClassMinutes + currentClass.classTime.duration * 60;
        // previousClassEndMinutes = currentClassEndMinutes;
      }
      fullRows[rowIndex] = updatedRow;
    }
    return fullRows;
  }

  function calculateSlotWidth(duration: number, totalSlots: number) {
    const widthPercentage = (duration / totalSlots) * 100;
    return widthPercentage;
  }

  function timeToMinutes(timeStr: string): number {
    if (!timeStr || typeof timeStr !== "string") {
      throw new Error("Invalid time string");
    }

    const timeParts = timeStr.split(":");
    if (timeParts.length !== 2) {
      throw new Error("Invalid time format, expected 'HH:MM'");
    }

    const [hours, minutes] = timeParts.map((part) => {
      const value = Number(part);
      if (isNaN(value)) {
        throw new Error("Invalid time format, expected 'HH:MM'");
      }
      return value;
    });

    if (hours === undefined || minutes === undefined) {
      throw new Error("Invalid time format, expected 'HH:MM'");
    }

    return hours * 60 + minutes;
  }

  function getRowAssignment(day: ModifiableClass[], totalSlots: number) {
    const rows: Row = {
      0: [],
    };

    if (day.length < 1) {
      return rows;
    }

    // Sort timetable based on start time in minutes
    const sortedTimetable = day.sort(
      (a, b) =>
        timeToMinutes(a.classTime.startTime) -
        timeToMinutes(b.classTime.startTime),
    );

    // console.log(sortedTimetable);

    for (let index = 0; index < sortedTimetable.length; index++) {
      const currentSlot = sortedTimetable[index]!;
      const currentSlotStartMinutes = timeToMinutes(
        currentSlot.classTime.startTime,
      );
      const currentSlotEndMinutes =
        currentSlotStartMinutes + currentSlot.classTime.duration * 60;

      // console.log(
      //   `Processing classes: ${currentSlot.moduleCode}, ${currentSlot.section}`,
      // );

      let addedToRow = false;

      // Iterate over existing rows to find where we can add the current slot without overlap
      for (let rowIndex = 0; rowIndex < Object.keys(rows).length; rowIndex++) {
        const currentRow = rows[rowIndex]!;
        let canAddToRow = true;

        // Check overlap with all classes already in the current row
        for (let classIndex = 0; classIndex < currentRow.length; classIndex++) {
          const existingClass = currentRow[classIndex];
          if (existingClass) {
            const existingClassStartMinutes = timeToMinutes(
              existingClass.classTime.startTime,
            );
            const existingClassEndMinutes =
              existingClassStartMinutes + existingClass.classTime.duration * 60;

            if (
              currentSlotStartMinutes < existingClassEndMinutes &&
              currentSlotEndMinutes > existingClassStartMinutes
            ) {
              // console.log(
              //   `Overlap detected between ${currentSlot.moduleCode} ${currentSlot.section} and ${existingClass.moduleCode} ${existingClass.section}`,
              // );
              canAddToRow = false;
              break;
            }
          }
        }

        if (canAddToRow) {
          currentRow.push({
            ...currentSlot,
            width: calculateSlotWidth(
              currentSlot.classTime.duration,
              totalSlots,
            ), // Function to calculate width
          });
          addedToRow = true;
          break;
        }
      }

      // Add new row if not addedToRow
      if (!addedToRow) {
        const newRowIndex = Object.keys(rows).length;
        const width =
          ((currentSlot.classTime.duration * 60) / (60 * totalSlots)) * 100;
        rows[newRowIndex] = [
          {
            ...currentSlot,
            width: width,
          },
        ];
      }
    }
    return rows;
  }

  if (!termSlug.includes(params.termId as TermSlug)) {
    return (
      <div>
        <p>Term not found</p>
      </div>
    );
  }

  const goToPreviousTerm = () => {
    if (currentTermIdx > 0) {
      router.push(`${termSlug[currentTermIdx - 1]}`);
    }
  };

  const goToNextTerm = () => {
    if (currentTermIdx < termSlug.length - 1) {
      router.push(`${termSlug[currentTermIdx + 1]}`);
    }
  };

  // console.log(TIMETABLE_COLORS);

  const handlePullFromPlanner = (year: Year) => {
    for (const termNo in planner[year]) {
      console.log(termNo);
      console.log(planner[year]);
      const moduleCodes = Object.keys(
        planner[year][termNo as Term],
      ) as ModuleCode[];
      moduleCodes.forEach((moduleCode) => {
        const module = modules[moduleCode];
        if (!!module) {
          AddModuleToTimetable(
            module,
            termMap[params.termId as TermSlug],
            timetableTheme,
          );
        }
      });
    }
  };

  return (
    <div
      style={{
        padding: PADDING,
      }}
    >
      <div className="mb-5 flex justify-center gap-24">
        <Button
          variant={"ghost"}
          onClick={goToPreviousTerm}
          disabled={currentTermIdx == 0}
        >
          &lt;
        </Button>
        <h1 className="my-1">Term {currentTermNum}</h1>
        <Button
          variant={"ghost"}
          onClick={goToNextTerm}
          disabled={currentTermIdx == termSlug.length - 1}
        >
          &gt;
        </Button>
      </div>

      <div>
        <Button variant={"default"} onClick={() => handlePullFromPlanner("2")}>
          <RefreshCw size={"icon"} />
          <span style={{ marginLeft: "0.5rem" }}>Synchronize with Planner</span>
        </Button>
      </div>

      <div className="max-w-full overflow-x-scroll">
        <div className="mt-5 w-full min-w-[1200px] overflow-hidden rounded-lg border border-foreground/20">
          {/* Time Labels */}
          <div className="flex">
            <div className="w-[5%] flex-shrink-0"></div>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className={cn(
                  "flex-1 items-center border-foreground/20 py-1 text-center",
                  index % 2 === 0 ? "bg-border" : "bg-accent/50",
                  index === 0 ? "border-none" : "border-l",
                )}
                style={{
                  width: `${100 / 14}%`,
                }}
              >
                <span className="text-sm">{time}</span>
              </div>
            ))}
          </div>
          {/* red line across current time now */}
          {Object.keys(timetable)
            .filter((key) => key != "modules")
            .map((day, dayIndex) => {
              const rowResult = getRowAssignment(timetable[day as Day], 15);
              const rowResultWithPadding = calculateSlotLeftPadding(
                rowResult,
                15,
              );
              return (
                <div className="flex border-t" key={dayIndex}>
                  <div className="flex w-[5%] items-center justify-center bg-background text-center font-medium">
                    {day.slice(0, 3)}
                  </div>
                  <div
                    className={`flex-grow space-y-1 py-1 ${
                      dayIndex % 2 === 0 ? "bg-border" : "bg-accent/50"
                    }`}
                  >
                    {Object.keys(rowResultWithPadding).map((rowIndexStr) => {
                      const rowIndex = parseInt(rowIndexStr, 10);
                      const minHeight = 60;
                      return (
                        <div
                          id={`Slot${rowIndex}`}
                          key={rowIndex}
                          className="relative flex flex-row"
                          style={{
                            position: "relative",
                            height: `${minHeight}px`,
                          }}
                        >
                          {rowResultWithPadding[rowIndex]!.map(
                            (fullClass, classIndex) => {
                              return (
                                <div
                                  key={classIndex}
                                  className="absolute rounded p-2 shadow-md"
                                  style={{
                                    left: `${fullClass.paddingLeft}%`,
                                    width: `${fullClass.width}%`,
                                    height: "100%",
                                    backgroundColor:
                                      selectedClass?.section ==
                                        fullClass.section &&
                                      selectedClass?.moduleCode ==
                                        fullClass.moduleCode
                                        ? TIMETABLE_THEMES[timetableTheme][
                                            fullClass.colorIndex
                                          ]?.backgroundColor
                                        : TIMETABLE_THEMES[timetableTheme][
                                            fullClass.colorIndex
                                          ]?.outOfFocusBackgroundColor,
                                    color:
                                      TIMETABLE_THEMES[timetableTheme][
                                        fullClass.colorIndex
                                      ]?.textColor,
                                  }}
                                  onClick={() => {
                                    if (selectedClass) {
                                      if (
                                        selectedClass.moduleCode ==
                                        fullClass.moduleCode
                                      ) {
                                        selectSection(
                                          fullClass.moduleCode,
                                          fullClass.section,
                                          termMap[params.termId as TermSlug],
                                        );
                                        setSelectedSection(undefined);
                                      } else {
                                        selectSection(
                                          selectedClass.moduleCode,
                                          selectedClass.section,
                                          termMap[params.termId as TermSlug],
                                        );
                                        setSelectedSection(undefined);
                                      }
                                    } else {
                                      showAllSections(
                                        fullClass.moduleCode,
                                        termMap[params.termId as TermSlug],
                                        timetableTheme,
                                        fullClass.section,
                                      );
                                      setSelectedSection(fullClass);
                                    }
                                  }}
                                >
                                  <span className="text-sm font-semibold">
                                    {`${fullClass.moduleCode} - ${fullClass.section}`}
                                  </span>
                                  <br />
                                  <span className="text-xs">
                                    {`${fullClass.classTime.startTime} (${fullClass.classTime.duration} hrs)`}
                                  </span>
                                </div>
                              );
                            },
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="my-5">
        <SearchModule
          handleModSelect={(mod) => {
            // console.log("Selected Module:", mod); // Debugging
            if (mod.terms.includes(termMap[params.termId as TermSlug])) {
              AddModuleToTimetable(
                mod,
                termMap[params.termId as TermSlug],
                timetableTheme,
              );
            } else {
              toast.error("This module is not offered during this term.");
            }
          }}
        />
      </div>
      {timetable.modules.length > 0 && (
        <div className="j flex w-full flex-wrap gap-2">
          {timetable.modules.map((mod, index) => (
            <div
              className="flex w-[32%] justify-center rounded bg-background p-4 shadow-sm"
              key={index}
            >
              <div className="flex w-1/12 items-start justify-end">
                <div
                  className="mr-2 mt-1 h-5 w-5 rounded"
                  style={{
                    backgroundColor:
                      TIMETABLE_THEMES[timetableTheme][mod.colorIndex]
                        ?.backgroundColor,
                  }}
                ></div>
              </div>
              <div className="w-9/12">
                <p className="text-sm font-bold">
                  {mod.moduleCode} - {mod.name}
                </p>
                <p className="text-sm">
                  Exam:{" "}
                  {mod.exam?.dateTime.toLocaleString() ?? "No exam scheduled"}
                </p>
              </div>
              <div className="flex w-2/12 items-center justify-center">
                <div className="inline-flex">
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    className="rounded-r-none"
                    onClick={() =>
                      removeModuleFromTimetable(
                        mod.moduleCode,
                        termMap[params.termId as TermSlug],
                      )
                    }
                  >
                    <Trash2 />
                  </Button>
                  {/* <Button
                    variant={"outline"}
                    size={"icon"}
                    className="rounded-l-none border-l-0"
                  >
                    <BiHide />
                  </Button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* <div>{TIMETABLE_COLORS.map()}</div> */}
    </div>
  );
}
