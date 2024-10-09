import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { EXEMPTION_YEAR, type Planner, type Term, type Year } from "@/types/planner";
import type { ModuleCode } from '@/types/primitives/module';
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult
} from "@hello-pangea/dnd";
import { X } from 'lucide-react';
import React, { useState } from 'react';

interface AccordionItemProps {
  year: string;
  content: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ year, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return content;
  }

  return (
    <div className="mb-4">
      <div
        className="rounded-t-lg flex justify-between bg-blue-500 p-3 items-center h-14 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold text-white">
          {year !== EXEMPTION_YEAR ? `Year ${year}` : "Exemptions"}
        </h2>
        <span className={`text-white transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>
      <div className={`shadow-lg overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-full' : 'max-h-0'}`}>
        {content}
      </div>
    </div>
  );
};

const MobileAccordionPlanner: React.FC<{
    planner: Planner; 
    onDragEnd: (result: DropResult) => void;
    handleRemoveModuleFromPlanner: (moduleCode: ModuleCode, year: Year, term: Term) => void;
    HandleAddMod: () => void;
    EXEMPTION_YEAR: string;
    DELIMITER: string;
}> = ({
  planner,
  onDragEnd,
  handleRemoveModuleFromPlanner,
  // HandleAddMod,
  EXEMPTION_YEAR,
  DELIMITER,
}) => {
  return (
    <div className="p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(planner).map(([year, terms]) => (
            <AccordionItem
              key={year}
              year={year}
              content={
                <div className="overflow-hidden rounded-b-lg bg-white shadow-lg flex flex-col">
                    
                  {Object.entries(terms).map(([term, termModules]) => (
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
                            snapshot.isDraggingOver ? "bg-blue-100" : "bg-gray-50",
                            "min-h-[120px]"
                          )}
                        >
                          {year != EXEMPTION_YEAR && (
                            <h3 className="mb-3 font-medium text-gray-700">{term}</h3>
                          )}
                          {year == EXEMPTION_YEAR && (
                            <h3 className="mb-3 font-medium text-gray-700"></h3>
                          )}
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
                                      "flex mb-2 rounded p-2 transition-all duration-200 justify-between items-center",
                                      snapshot.isDragging
                                        ? "bg-blue-200 shadow-lg"
                                        : "border border-gray-200 bg-white hover:bg-gray-100"
                                    )}
                                  >
                                    <div className="w-5/6">{moduleCode}</div>
                                    <Button
                                      onClick={() =>
                                        handleRemoveModuleFromPlanner(moduleCode as ModuleCode, year as Year, term as Term)
                                      }
                                      variant="destructive"
                                      size="icon"
                                      className="rounded-full size-6"
                                    >
                                      <X className="size-5" />
                                    </Button>
                                  </div>
                                )}
                              </Draggable>
                            )
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              }
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default MobileAccordionPlanner;