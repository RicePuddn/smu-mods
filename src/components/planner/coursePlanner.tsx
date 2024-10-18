"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useModuleBankStore } from "@/stores/moduleBank/provider";
import { usePlannerStore } from "@/stores/planner/provider";
import {
  EXEMPTION_YEAR,
  MODSTOTAKE_TERM,
  MODSTOTAKE_YEAR,
  type Term,
  type Year,
} from "@/types/planner";
import type { Module, ModuleCode } from "@/types/primitives/module";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import React from "react";
import { SearchModule } from "../SearchModule";
import { Button } from "../ui/button";
import "./scrollBar.css";

const DELIMITER = "/$/";

const CoursePlanner: React.FC = () => {
  const isMobile = useIsMobile();
  const {
    addModule: addModuleToPlanner,
    changeTerm,
    planner,
    removeModule,
  } = usePlannerStore((state) => state);
  const { modules, addModule: addModuleToBank } = useModuleBankStore(
    (state) => state,
  );
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

  const HandleAddMod = (module: Module) => {
    addModuleToBank(module);
    addModuleToPlanner(
      module.moduleCode,
      {
        year: MODSTOTAKE_YEAR as Year,
        term: MODSTOTAKE_TERM as Term,
        id: module.moduleCode,
      },
      { ...modules, [module.moduleCode]: module },
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
    <div className="p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className={cn(
            isMobile
              ? "grid grid-cols-1 gap-6"
              : "scrollbar-hide flex flex-nowrap overflow-x-auto scroll-smooth",
          )}
        >
          {Object.keys(planner)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map((year) => {
              const terms = planner[year as Year];
              return (
                <div
                  key={year}
                  className={cn(
                    "mb-2 flex flex-col overflow-hidden rounded-lg bg-white shadow-md",
                    !isMobile ? "mr-6 w-96 flex-shrink-0" : "mb-6",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-14 items-center justify-between bg-blue-500 p-3",
                      isMobile && "cursor-pointer",
                    )}
                    onClick={() => isMobile && toggleYear(year)}
                  >
                    <h2 className="text-lg font-semibold text-white">
                      {year === EXEMPTION_YEAR
                        ? "Exemptions"
                        : year === MODSTOTAKE_YEAR
                          ? "Plan to Take"
                          : `Year ${year}`}
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
                      <Droppable
                        droppableId={`${year}${DELIMITER}${term}`}
                        key={`${year}${DELIMITER}${term}`}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={cn(
                              "p-3 transition-colors duration-200",
                              snapshot.isDraggingOver
                                ? "bg-blue-100"
                                : "bg-gray-50",
                              year === EXEMPTION_YEAR && !isMobile
                                ? "flex-grow"
                                : year === MODSTOTAKE_YEAR && !isMobile
                                  ? "flex-grow"
                                  : "min-h-[120px]",
                            )}
                          >
                            <h3 className="mb-3 font-medium text-gray-700">
                              {year === EXEMPTION_YEAR
                                ? ""
                                : year === MODSTOTAKE_YEAR
                                  ? ""
                                  : `${term}`}
                            </h3>

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
                    ))}
                </div>
              );
            })}
        </div>
      </DragDropContext>
      <SearchModule handleModSelect={HandleAddMod} />
    </div>
  );
};

export default CoursePlanner;
