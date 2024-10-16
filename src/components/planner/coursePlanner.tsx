"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useModuleBankStore } from "@/stores/moduleBank/provider";
import { usePlannerStore } from "@/stores/planner/provider";
// import { api } from "@/trpc/react";
import { EXEMPTION_YEAR, type Term, type Year } from "@/types/planner";
import type { ModuleCode } from "@/types/primitives/module";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const DELIMITER = "/$/";

const CoursePlanner: React.FC = () => {
  // const {mutateAsync} = api.module.searchModule.useMutation()
  // const result= await mutateAsync({query:"okokok"}) //put on event thingy
  // // once get result, update state

  const isMobile = useIsMobile();
  const {
    addModule: addModuleToPlanner,
    changeTerm,
    planner,
    removeModule,
  } = usePlannerStore((state) => state);
  const { modules } = useModuleBankStore((state) => state);
  const [isOpen, setIsOpen] = React.useState<Set<string>>(new Set());

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const dest = result.destination.droppableId.split(DELIMITER);
    const src = result.source.droppableId.split(DELIMITER);

    if (src[0] == dest[0] && src[1] == dest[1]) {
      return;
    }
    changeTerm(
      src[0] as Year,
      src[1] as Term,
      dest[0] as Year,
      dest[1] as Term,
      result.draggableId as ModuleCode,
      modules,
    );
  };

  const HandleAddMod = () => {
    addModuleToPlanner(
      "IS216",
      {
        year: "1",
        term: "Term 1",
        id: "IS216",
      },
      modules,
    );
  };

  const handleRemoveModuleFromPlanner = (
    moduleCode: ModuleCode,
    year: Year,
    term: Term,
  ) => {
    removeModule(moduleCode, year, term, modules);
  };

  const toggleYear = (year: string) => {
    setIsOpen((prevExpandedYears) => {
      const newOpenYears = new Set(prevExpandedYears);
      if (newOpenYears.has(year)) {
        newOpenYears.delete(year);
      } else {
        newOpenYears.add(year);
      }
      return newOpenYears;
    });
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className={cn(
            "mb-6 grid gap-6",
            isMobile
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {Object.entries(planner).map(([year, terms]) => (
            <div
              key={year}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md"
            >
              <div
                className={cn(
                  "flex h-14 items-center justify-between bg-blue-500 p-3",
                  isMobile && "cursor-pointer",
                )}
                onClick={() => isMobile && toggleYear(year)}
              >
                <h2 className="text-lg font-semibold text-white">
                  {year !== EXEMPTION_YEAR ? `Year ${year}` : "Exemptions"}
                </h2>
                {isMobile &&
                  (!isMobile || isOpen.has(year) ? (
                    <ChevronUp className="text-white" />
                  ) : (
                    <ChevronDown className="text-white" />
                  ))}
              </div>
              {(!isMobile || isOpen.has(year)) &&
                Object.entries(terms).map(([term, termModules]) => (
                  <div
                    className={cn(
                      "p-3 transition-colors duration-200",
                      year !== EXEMPTION_YEAR ? "min-h-[120px]" : "flex-grow",
                    )}
                    key={`${year}${DELIMITER}${term}`}
                  >
                    {year != EXEMPTION_YEAR && (
                      <h3 className="font-medium text-gray-700">{term}</h3>
                    )}
                    {year == EXEMPTION_YEAR && (
                      <h3 className="font-medium text-gray-700"></h3>
                    )}
                    <Droppable droppableId={`${year}${DELIMITER}${term}`}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={cn(
                            "h-[calc(100%-20px)]",
                            snapshot.isDraggingOver
                              ? "bg-blue-100"
                              : "bg-gray-50",
                          )}
                        >
                          {Object.entries(termModules).map(
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            ([moduleCode, { conflicts }], index) => (
                              <Draggable
                                key={moduleCode}
                                draggableId={moduleCode}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={cn(
                                      "mb-2 flex items-center justify-between rounded p-2 transition-all duration-200",
                                      snapshot.isDragging
                                        ? "bg-blue-200 shadow-lg"
                                        : "border border-gray-200 bg-white hover:bg-gray-100",
                                    )}
                                  >
                                    <div className="w-5/6">{moduleCode}</div>
                                    <Button
                                      onClick={() =>
                                        handleRemoveModuleFromPlanner(
                                          moduleCode as ModuleCode,
                                          year as Year,
                                          term as Term,
                                        )
                                      }
                                      variant={"destructive"}
                                      size={"icon"}
                                      className="size-6 rounded-full"
                                    >
                                      <X className="size-5" />
                                    </Button>
                                  </div>
                                )}
                              </Draggable>
                            ),
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </DragDropContext>
      <Button
        onClick={HandleAddMod}
        className="rounded bg-green-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-green-600"
      >
        Add Module
      </Button>
    </div>
  );
};

export default CoursePlanner;
