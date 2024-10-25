"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toCanvas, toPng } from "html-to-image";
import ical, { ICalCalendarMethod } from "ical-generator";
import jsPDF from "jspdf";
import {
  Calendar,
  Download,
  EyeOff,
  File,
  Image,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import type { Term, TermSlug, Year } from "@/types/planner";
import type { ModuleCode } from "@/types/primitives/module";
import type { Day, ModifiableClass } from "@/types/primitives/timetable";
import { SearchModule } from "@/components/SearchModule";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { APP_CONFIG, PADDING } from "@/config";
import { cn } from "@/lib/utils";
import { useConfigStore } from "@/stores/config/provider";
import { useModuleBankStore } from "@/stores/moduleBank/provider";
import { usePlannerStore } from "@/stores/planner/provider";
import { useTimetableStore } from "@/stores/timetable/provider";
import { termMap, termSlug } from "@/types/planner";
import { days, timeSlots } from "@/types/primitives/timetable";
import { TIMETABLE_THEMES } from "@/utils/timetable/colours";
import { getRecurringEvents } from "@/utils/timetable/timetable";

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
    changeColorOfModule,
  } = useTimetableStore((state) => state);
  const { timetableTheme } = useConfigStore((state) => state);

  const { planner } = usePlannerStore((state) => state);

  const { modules } = useModuleBankStore((state) => state);

  const [selectedClass, setSelectedSection] = useState<FullClass>();
  const [hideCurrentTime, setHideCurrentTime] = useState(false);

  const router = useRouter();
  const currentTermIdx = termSlug.indexOf(params.termId as TermSlug);
  const currentTermNum = termSlug[currentTermIdx]?.split("-")[1];
  const timetable = timetableMap[termMap[params.termId as TermSlug]];

  const addedMods = () => {
    const addedModsList: ModuleCode[] = [];
    Object.keys(timetable).forEach((day) => {
      const dayMods = timetable[day as Day];
      if (dayMods.length > 0) {
        dayMods.forEach((mod) => {
          addedModsList.push(mod.moduleCode);
        });
      }
    });
    return addedModsList;
  };
  const [currentTimePosition, setCurrentTimePosition] = useState<number | null>(
    null,
  );

  const calculateCurrentTimePosition = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    // Return null if the current hour is not within the timetable time frame

    if (hours < 8 || hours >= 22) {
      return null;
    }

    const totalMinutes = (hours - 8) * 60 + minutes;
    const position = (totalMinutes / (60 * 14)) * 100;
    return position;
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTimePosition(calculateCurrentTimePosition);
    };
    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // port over to utils
  const getCurrentDay = () => {
    let currentDayIdx = new Date().getDay();

    // Return null when it's sunday
    if (currentDayIdx == 0) {
      return null;
    } else {
      currentDayIdx -= 1;
    }
    return days[currentDayIdx];
  };

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

        const durationInMinutes = currentClass.classTime.duration * 60;
        const width = (durationInMinutes / (60 * totalSlots)) * 100;

        totalLeftOffset += width + paddingLeft;

        const fullClass: FullClass = {
          ...currentClass,
          paddingLeft: totalLeftOffset - width,
          // width: width,
        };

        updatedRow.push(fullClass);
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

  const elementRef = useRef<HTMLDivElement>(null);

  const exportAsPdfOrImage = async (type: "png" | "pdf") => {
    setHideCurrentTime(true);
    const element = elementRef.current;
    if (!element) {
      return;
    }
    if (type === "pdf") {
      const canvas = await toCanvas(element, {
        quality: 1,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(
        `smumods_${APP_CONFIG.academicYear}_${APP_CONFIG.currentTerm}.pdf`,
      );
    } else {
      const image = await toPng(element, {
        quality: 1,
      });
      download(
        image,
        `smumods_${APP_CONFIG.academicYear}_${APP_CONFIG.currentTerm}.png`,
      );
    }
    setHideCurrentTime(false);
  };

  const download = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!termSlug.includes(params.termId as TermSlug)) {
    return (
      <div>
        <p>Term not found</p>
      </div>
    );
  }

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
          <RefreshCw />
          <span style={{ marginLeft: "0.5rem" }}>Synchronize with Planner</span>
        </Button>
      </div>

      <div className="my-4 max-w-full overflow-x-scroll">
        <div
          className="w-full min-w-[1200px] overflow-hidden rounded-lg border border-foreground/20 bg-background"
          ref={elementRef}
        >
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
          {/* Timetable rows */}
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
                    style={{ position: "relative" }}
                  >
                    {/* Show current date and time marker */}
                    {getCurrentDay() == day &&
                      currentTimePosition != null &&
                      !hideCurrentTime && (
                        <>
                          {/* Red Line */}
                          <div
                            className="absolute bg-red-500"
                            style={{
                              left: `${currentTimePosition}%`,
                              height: "95%",
                              width: "2px",
                              zIndex: 10,
                            }}
                          />

                          {/* Circle Marker */}
                          <div
                            className="absolute rounded-full bg-red-500"
                            style={{
                              left: `calc(${currentTimePosition}% - 4px)`, // Center the circle on the line
                              top: "-2px", // Slightly above the line
                              width: "10px",
                              height: "10px",
                              zIndex: 10,
                            }}
                          />
                        </>
                      )}

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
                                  className={`absolute cursor-pointer rounded p-2 shadow-md transition-all duration-1000 ${
                                    selectedClass?.section ===
                                      fullClass.section &&
                                    selectedClass?.moduleCode ===
                                      fullClass.moduleCode
                                      ? "animate-pop"
                                      : ""
                                  }`}
                                  style={{
                                    left: `${fullClass.paddingLeft}%`,
                                    width: `${fullClass.width}%`,
                                    height: "100%",
                                    backgroundColor:
                                      TIMETABLE_THEMES[timetableTheme][
                                        fullClass.colorIndex
                                      ]?.backgroundColor,
                                    color:
                                      TIMETABLE_THEMES[timetableTheme][
                                        fullClass.colorIndex
                                      ]?.textColor,
                                    opacity:
                                      !selectedClass ||
                                      (selectedClass.moduleCode ===
                                        fullClass.moduleCode &&
                                        selectedClass.section ===
                                          fullClass.section)
                                        ? 1
                                        : fullClass.moduleCode ===
                                            selectedClass?.moduleCode
                                          ? 0.6
                                          : 1,
                                    transition:
                                      "background-color 0.2s, transform 0.2s",
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
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      TIMETABLE_THEMES[timetableTheme][
                                        fullClass.colorIndex
                                      ]!.hoverBackgroundColor;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      TIMETABLE_THEMES[timetableTheme][
                                        fullClass.colorIndex
                                      ]!.backgroundColor;
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
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} disabled={!!selectedClass}>
              <Download className="mr-2" />
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {APP_CONFIG.currentTerm == params.termId && (
              <DropdownMenuItem
                onClick={() => {
                  const calendar = ical({
                    name: "smumods-timetable",
                    prodId: "-//smumods.johnnyknl.me//EN",
                  });

                  calendar.method(ICalCalendarMethod.PUBLISH);

                  const classes = getRecurringEvents(timetable);
                  classes.forEach((event) => {
                    calendar.createEvent(event);
                  });
                  const string = calendar.toString();
                  const blob = new Blob([string], {
                    type: "text/calendar;charset=utf-8",
                  });
                  download(
                    URL.createObjectURL(blob),
                    `smumods_${APP_CONFIG.academicYear}_${APP_CONFIG.currentTerm}.ics`,
                  );
                }}
              >
                <Calendar className="mr-2 size-4" />
                iCal
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => {
                exportAsPdfOrImage("pdf");
              }}
            >
              <File className="mr-2 size-4" />
              PDF
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                exportAsPdfOrImage("png");
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image className="mr-2 size-4" />
              PNG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          takenModule={addedMods()}
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
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className="mr-2 mt-1 h-5 w-5 rounded"
                      style={{
                        backgroundColor:
                          TIMETABLE_THEMES[timetableTheme][mod.colorIndex]
                            ?.backgroundColor,
                      }}
                    ></div>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit">
                    <div className="grid w-28 grid-cols-3 items-center justify-center gap-2">
                      {TIMETABLE_THEMES[timetableTheme].map((color, index) => (
                        <div
                          key={index}
                          style={{ backgroundColor: color.backgroundColor }}
                          className="size-8 cursor-pointer rounded"
                          onClick={() => {
                            changeColorOfModule(
                              termMap[params.termId as TermSlug],
                              mod.moduleCode,
                              index,
                            );
                          }}
                        ></div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="w-9/12">
                <p className="text-sm font-bold">
                  {mod.moduleCode} - {mod.name}
                </p>
                <p className="text-sm">
                  Exam:{" "}
                  {mod.exam?.dateTime
                    ? format(new Date(mod.exam.dateTime), "M/dd/yyyy")
                    : "No exam scheduled"}
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
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    className="rounded-l-none border-l-0"
                  >
                    <EyeOff />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
