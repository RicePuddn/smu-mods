"use client";

import { cn } from "@/lib/utils";
import { useModuleBankStore } from "@/stores/moduleBank/provider";
import { usePlannerStore } from "@/stores/planner/provider";
import type { Term, Year } from "@/types/planner";
import type { ModuleCode } from "@/types/primitives/module";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { X } from "lucide-react";
import { Button } from "../ui/button";

const CoursePlanner: React.FC = () => {
  const { addModule, changeTerm, removeYear, planner, removeModule } = usePlannerStore((state) => state);
  const { modules } = useModuleBankStore((state) => state);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const dest = result.destination.droppableId.split("-");
    const src = result.source.droppableId.split("-");
    if(src[0] == dest[0] && src[1]== dest[1]){
      return
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
    addModule(
      "IS216",
      {
        year: "1",
        term: "Term 1",
        id: "IS216",
      },
      modules,
    );
  };

  const handleRemoveYear = (year: Year) => {
    removeYear(year, modules);
  };

  const handleRemoveModuleFromPlanner = (moduleCode: ModuleCode, year: Year, term: Term)=>{
    removeModule(moduleCode, year, term, modules)
  }

  return (
    <div className="p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(planner).map(([year, terms]) => (
            <div
              key={year}
              className="overflow-hidden rounded-lg bg-white shadow-md"
            >
              <div className="flex justify-between bg-blue-500 p-3">
                <h2 className="text-lg font-semibold text-white">
                  Year {year}
                </h2>
                {year !== "-1" && (
                  <Button
                    onClick={() => handleRemoveYear(year as Year)}
                    className="bg-blue-400 px-2 py-1 text-sm font-bold text-white transition-colors duration-200 hover:bg-red-600"
                  >
                    Delete Year
                  </Button>
                )}
              </div>
              {Object.entries(terms).map(([term, termModules]) => (
                <Droppable
                  droppableId={`${year}-${term}`}
                  key={`${year}-${term}`}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[120px] p-3 transition-colors duration-200 ${
                        snapshot.isDraggingOver ? "bg-blue-100" : "bg-gray-50"
                      }`}
                    >
                      <h3 className="mb-3 font-medium text-gray-700">{term}</h3>
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
                                className={cn("flex mb-2 rounded p-2 transition-all duration-200 justify-between items-center",
                                  snapshot.isDragging
                                    ? "bg-blue-200 shadow-lg"
                                    : "border border-gray-200 bg-white hover:bg-gray-100"
                                )}
                              >
                                <div className="w-5/6">{moduleCode}</div>
                                  <Button
                                  onClick={() => handleRemoveModuleFromPlanner(moduleCode as ModuleCode, year as Year, term as Term)}
                                  variant={
                                    "destructive"
                                  }
                                  size={"icon"} className="rounded-full size-6"> 
                                    <X className="size-6"/>
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
