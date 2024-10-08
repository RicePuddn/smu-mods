'use client'

import { Button } from "@/components/ui/button";
import { useTimetableStore } from "@/stores/timetable/provider";
import { Term, termSlug as termArray, TermSlug } from "@/types/planner";
import { ModifiableClass, startingTime, Timetable } from "@/types/primitives/timetable";
import { getClassEndTime } from "@/utils/timetable";
import { useRouter } from "next/navigation";

export default function TimeTablePage({params}: {params: {termId: string}}) {
  const { timetableMap, showAllSections, selectSection } = useTimetableStore((state) => state);
  const router = useRouter();
  let currentTermIdx = termArray.indexOf(params.termId as TermSlug);
  let currentTermNum = termArray[currentTermIdx]?.split("-")[1];
  const timetable = timetableMap[`Term ${currentTermNum}` as Term]

  function calculateSlotLeftPadding() {
    
  }

  function calculateSlotWidth(duration: number, totalSlots: number, slotDuration: number) {
    const slotsOccupied = duration / slotDuration;
    const widthPercentage = (slotsOccupied / totalSlots) * 100;
    return widthPercentage;    
  }

  function getSlotPadding(day: ModifiableClass[]) {
    let rows:Record<number, (ModifiableClass & {
      paddingLeft: number,
      width: number
    })[]>  = {
      0: [],
    }

    if (day.length < 1) {
      return rows;
    }

    const sortedTimetable = day.sort((a,b) => startingTime.indexOf(a.classTime.startTime) - startingTime.indexOf(b.classTime.startTime))


    for (let index = 0; index < sortedTimetable.length; index++) {
      const currentSlot = sortedTimetable[index]!;
      const currentSlotEndTime = getClassEndTime(currentSlot.classTime.startTime, currentSlot.classTime.duration);

      let addedToRow = false;
      
      for (let rowIndex = 0; rowIndex < Object.keys(rows).length; rowIndex++) {
        let currentRow = rows[rowIndex]!;

        if (currentRow.length === 0) {
          currentRow.push({
            ...currentSlot,
            paddingLeft: 0, //function to calculate padding
            width: 0 // function to calculate width
          });
          addedToRow = true;
          break;

        } else {
          const lastClass = currentRow[currentRow.length-1];
          if (
            lastClass &&
            lastClass.classTime.startTime &&
            lastClass.classTime.duration != undefined
          ) {
            const endTime = getClassEndTime(lastClass.classTime.startTime, lastClass.classTime.duration)
            if (endTime <= currentSlot.classTime.startTime) {
              currentRow.push({
                ...currentSlot,
                paddingLeft: 0, //function to calculate padding
                width: 0 // function to calculate width
              });
              addedToRow = true;
              break;
            }
          }
        }
      }

      if (!addedToRow) {
        let newRowIndex = Object.keys(rows).length;
        rows[newRowIndex] = [{
          ...currentSlot,
          paddingLeft:0, // function to calculate padding
          width:0 //function to calculate width
        }];
      }
    }
    return rows;
  }

  // let rows = getSlotPadding()

 const mondaySample:Timetable = {
  "Monday":[],
  "Tuesday":[],
  "Wednesday":[],
  "Thursday":[],
  "Friday":[],
  "Saturday":[],
 };


  
  // console.log()
  if (!termArray.includes(params.termId as TermSlug)) {
    return (
        <div>
            <p>Term not found</p>
        </div>
    );
  }

  const goToPreviousTerm = () => {
    if (currentTermIdx > 0) {
        console.log(currentTermIdx);
        router.push(`${termArray[currentTermIdx-1]}`);
    }
  };

  const goToNextTerm = () => {
    if (currentTermIdx < termArray.length - 1) {
        router.push(`${termArray[currentTermIdx+1]}`);
    }
  }

  return (
    <div>
      <div className="flex justify-center gap-24">
        <Button 
        variant={"ghost"} onClick={goToPreviousTerm} disabled={currentTermIdx==0}>&lt;</Button>
        <h1 className="my-1">Term {currentTermNum}</h1>
        <Button variant={"ghost"} onClick={goToNextTerm} disabled={currentTermIdx==termArray.length - 1}>&gt;</Button>
      </div>

      <div className="container mx-auto mt-10">
        <div className="grid grid-cols"></div>
      </div>
    </div>
    
  );
}