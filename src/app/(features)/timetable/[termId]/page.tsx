"use client";

import { Button } from "@/components/ui/button";
import { useTimetableStore } from "@/stores/timetable/provider";
import { Term, termSlug as termArray, TermSlug } from "@/types/planner";
import { ModifiableClass, Timetable } from "@/types/primitives/timetable";
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
  const { timetableMap, showAllSections, selectSection } = useTimetableStore(
    (state) => state,
  );
  const router = useRouter();
  let currentTermIdx = termArray.indexOf(params.termId as TermSlug);
  let currentTermNum = termArray[currentTermIdx]?.split("-")[1];
  const timetable = timetableMap[`Term ${currentTermNum}` as Term];

  function calculateSlotLeftPadding(rows: Row, totalSlots: number): FullRow {
    let fullRows: FullRow = {};

    // Iterate through the row
    for (let rowIndex = 0; rowIndex < Object.keys(rows).length; rowIndex++) {
      let currentRow = rows[rowIndex];
      let updatedRow: FullClass[] = [];

      // Initialize previousClassEndMinutes to 08:00 for the first class inserted to the row
      let previousClassEndMinutes = timeToMinutes("08:00");
      for (let classIndex = 0; classIndex < currentRow!.length; classIndex++) {
        let currentClass = currentRow![classIndex];
        if (!currentClass) {
          continue;
        }
        let currentClassTime = currentClass.classTime.startTime;
        let currentClassMinutes = timeToMinutes(currentClassTime);

        // If not the first class in the row, change previousClassEndTime to the previous class' actual endTime
        if (classIndex != 0) {
          let previousClassEndTime = getClassEndTime(
            currentRow![classIndex - 1]!.classTime.startTime,
            currentRow![classIndex - 1]!.classTime.duration,
          );
          let previousClassEndMinutes = timeToMinutes(previousClassEndTime);
        }

        let minutesDifference = currentClassMinutes - previousClassEndMinutes;
        console.log(minutesDifference);

        // If the two slots are back to back, set padding to 0
        let paddingLeft = 0;
        if (minutesDifference != 0) {
          paddingLeft = (minutesDifference / 60 / totalSlots) * 100;
        }

        // Assign new padding value to each class in the row

        let fullClass: FullClass = {
          ...currentClass,
          paddingLeft: paddingLeft,
        };

        updatedRow.push(fullClass);

        let currentClassEndMinutes =
          currentClassMinutes + currentClass.classTime.duration * 60;
        previousClassEndMinutes = currentClassEndMinutes;
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

  function getRowAssignment(day: ModifiableClass[]) {
    let rows: Row = {
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
        let currentRow = rows[rowIndex]!;
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
            width: calculateSlotWidth(currentSlot.classTime.duration, 14), // Function to calculate width
          });
          addedToRow = true;
          break;
        }
      }

      // Add new row if not addedToRow
      if (!addedToRow) {
        let newRowIndex = Object.keys(rows).length;
        rows[newRowIndex] = [
          {
            ...currentSlot,
            width: calculateSlotWidth(currentSlot.classTime.duration, 14), // Function to calculate width
          },
        ];
      }
    }
    return rows;
  }

  const mondaySample: Timetable = {
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
        colorIndex: 0,
      },
      {
        moduleCode: "COR-IS1704",
        section: "G1",
        classTime: {
          day: "Monday",
          startTime: "12:00",
          duration: 3.25,
        },
        colorIndex: 0,
      },
      {
        moduleCode: "COR-IS1704",
        section: "G2",
        classTime: {
          day: "Monday",
          startTime: "10:00",
          duration: 3.25,
        },
        colorIndex: 0,
      },
    ],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  };

  const rowsResult = getRowAssignment(mondaySample.Monday);
  // console.log(rowsResult);
  const rowsResultWithPadding = calculateSlotLeftPadding(rowsResult, 14);
  console.log(rowsResultWithPadding);

  if (!termArray.includes(params.termId as TermSlug)) {
    return (
      <div>
        <p>Term not found</p>
      </div>
    );
  }

  const goToPreviousTerm = () => {
    if (currentTermIdx > 0) {
      // console.log(currentTermIdx);
      router.push(`${termArray[currentTermIdx - 1]}`);
    }
  };

  const goToNextTerm = () => {
    if (currentTermIdx < termArray.length - 1) {
      router.push(`${termArray[currentTermIdx + 1]}`);
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
          disabled={currentTermIdx == termArray.length - 1}
        >
          &gt;
        </Button>
      </div>

      <div className="container mx-auto mt-10">
        <div className="grid-cols grid"></div>
      </div>
    </div>
  );
}
