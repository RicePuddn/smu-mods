"use client";

import { Button } from "@/components/ui/button";
import { termSlug, type TermSlug } from "@/types/planner";
import type { Day, ModifiableClass, Timetable } from "@/types/primitives/timetable";
import { getClassEndTime } from "@/utils/timetable";
import { useRouter } from "next/navigation";

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
  // const { timetableMap, showAllSections, selectSection } = useTimetableStore(
  //   (state) => state,
  // );
  const router = useRouter();
  const currentTermIdx = termSlug.indexOf(params.termId as TermSlug);
  const currentTermNum = termSlug[currentTermIdx]?.split("-")[1];
  // const timetable = timetableMap[termMap[params.termId as TermSlug]];

  function calculateSlotLeftPadding(rows: Row, totalSlots: number): FullRow {
    const fullRows: FullRow = {};

    // Iterate through the row
    for (let rowIndex = 0; rowIndex < Object.keys(rows).length; rowIndex++) {
      const currentRow = rows[rowIndex];
      const updatedRow: FullClass[] = [];

      // Initialize previousClassEndMinutes to 08:00 for the first class inserted to the row
      let previousClassEndMinutes = timeToMinutes("08:00");
      for (let classIndex = 0; classIndex < currentRow!.length; classIndex++) {
        const currentClass = currentRow![classIndex];
        if (!currentClass) {
          continue;
        }
        const currentClassTime = currentClass.classTime.startTime;
        const currentClassMinutes = timeToMinutes(currentClassTime);

        // If not the first class in the row, change previousClassEndTime to the previous class' actual endTime
        if (classIndex != 0) {
          const previousClassEndTime = getClassEndTime(
            currentRow![classIndex - 1]!.classTime.startTime,
            currentRow![classIndex - 1]!.classTime.duration,
          );
          previousClassEndMinutes = timeToMinutes(previousClassEndTime);
        }

        const minutesDifference = currentClassMinutes - previousClassEndMinutes;
        console.log(minutesDifference);

        // If the two slots are back to back, set padding to 0
        let paddingLeft = 0;
        if (minutesDifference != 0) {
          paddingLeft = (minutesDifference / 60 / totalSlots) * 100;
        }

        // Assign new padding value to each class in the row

        const fullClass: FullClass = {
          ...currentClass,
          paddingLeft: paddingLeft,
        };

        updatedRow.push(fullClass);

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
        rows[newRowIndex] = [
          {
            ...currentSlot,
            width: calculateSlotWidth(
              currentSlot.classTime.duration,
              totalSlots,
            ), // Function to calculate width
          },
        ];
      }
    }
    return rows;
  }

  const sampleTimetable: Timetable = {
    Monday: [
      {
        moduleCode: "IS113",
        section: "G2",
        classTime: {
          day: "Monday",
          startTime: "08:15",
          duration: 3.25,
        },
        colorIndex: 0,
      },
      {
        moduleCode: "IS112",
        section: "G5",
        classTime: {
          day: "Monday",
          startTime: "08:15",
          duration: 3.25,
        },
        colorIndex: 1,
      },
      {
        moduleCode: "COR-IS1704",
        section: "G1",
        classTime: {
          day: "Monday",
          startTime: "12:00",
          duration: 3.25,
        },
        colorIndex: 2,
      },
      {
        moduleCode: "COR-IS1704",
        section: "G2",
        classTime: {
          day: "Monday",
          startTime: "10:00",
          duration: 3.25,
        },
        colorIndex: 1,
      },
    ],
    Tuesday: [
      {
        moduleCode: "IS114",
        section: "G2",
        classTime: {
          day: "Monday",
          startTime: "15:30",
          duration: 1.5,
        },
        colorIndex: 0,
      },
    ],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  };

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  if (!termSlug.includes(params.termId as TermSlug)) {
    return (
      <div>
        <p>Term not found</p>
      </div>
    );
  }

  const goToPreviousTerm = () => {
    if (currentTermIdx > 0) {
      // console.log(currentTermIdx);
      router.push(`${termSlug[currentTermIdx - 1]}`);
    }
  };

  const goToNextTerm = () => {
    if (currentTermIdx < termSlug.length - 1) {
      router.push(`${termSlug[currentTermIdx + 1]}`);
    }
  };

  return (
    <div>
      <div className="flex justify-center gap-24">
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

      <div className="max-w-full overflow-x-scroll">
        <div className="container mx-auto mt-10 min-w-[1200px] overflow-hidden rounded-lg border border-gray-300">
          {/* Time Labels */}
          <div className="flex">
            <div className="w-[10%] flex-shrink-0 md:w-[7.5%]"></div>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className={`flex-1 items-center py-1 text-center ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                }`}
                style={{
                  width: `${100 / 14}%`,
                  borderLeft: index === 0 ? "none" : "1px solid #e0e0e0",
                }}
              >
                <span className="text-sm text-gray-800">{time}</span>
              </div>
            ))}
          </div>
          {/* {days.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-4 flex h-24">
            <div className="flex w-1/6 flex-shrink-0 items-center justify-center bg-gray-300 font-bold text-gray-700">
              {day}
            </div>
          </div>
        ))} */}
          {/* red line across current time now */}
          {Object.keys(sampleTimetable).map((day, dayIndex) => {
            const rowResult = getRowAssignment(sampleTimetable[day as Day], 15);
            const rowResultWithPadding = calculateSlotLeftPadding(
              rowResult,
              15,
            );
            return (
              <div className="flex border-t border-gray-300" key={dayIndex}>
                <div className="flex w-[10%] items-center justify-center text-center font-medium text-gray-800 md:w-[7.5%]">
                  {day.slice(0, 3)}
                </div>
                <div
                  className={`flex-grow space-y-1 py-1 ${
                    dayIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                  }`}
                >
                  {Object.keys(rowResultWithPadding).map((rowIndexStr) => {
                    const rowIndex = parseInt(rowIndexStr, 10); // Convert rowIndex to number
                    const minHeight = 60;
                    // if (!!document) {
                    //   const element = document.getElementById(
                    //     `Slot${rowIndex}`,
                    //   );
                    //   if (element) {
                    //     for (
                    //       let index = 0;
                    //       index < element.children.length;
                    //       index++
                    //     ) {
                    //       const child = element.children.item(index);
                    //       if (!child) continue;
                    //       const { height } = child.getBoundingClientRect();
                    //       if (height > minHeight) {
                    //         minHeight = height;
                    //       }
                    //     }
                    //   }
                    // }
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
                                className="absolute rounded bg-blue-300 p-2 text-white shadow-md"
                                style={{
                                  left: `${fullClass.paddingLeft}%`,
                                  width: `${fullClass.width}%`,
                                  height: "100%",
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
    </div>
  );
}
