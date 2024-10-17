"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useModuleBankStore } from "@/stores/moduleBank/provider";
import { usePlannerStore } from "@/stores/planner/provider";
import { api } from "@/trpc/react";
import { EXEMPTION_YEAR, MODSTOTAKE_TERM, MODSTOTAKE_YEAR, type Term, type Year } from "@/types/planner";
import type { Module, ModuleCode } from "@/types/primitives/module";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { debounce } from "lodash";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import "./scrollBar.css";

const DELIMITER = "/$/"

const CoursePlanner: React.FC = () => {

  const {mutateAsync} = api.module.searchModule.useMutation(
    // {
    // onSuccess: (data)=>{
    //   setSuggestionResults(data);
    //   setShowSuggestion(true);
    // }
    // }
  ) 

  const [searchString, setSearchString] = useState("");
  const [suggestionResults, setSuggestionResults] = useState<Module[]>([]);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Module[]>([]);
  const [showSearchResult, setShowSearchResult]= useState<boolean>(false);

  const debouncedSearch = debounce((query: string) => {
    if (query.length > 0) {
      mutateAsync({
        query: searchString
      }).then((results) => {
        setSuggestionResults(results);
        setShowSuggestion(true);
      });
    } else {
      setShowSuggestion(false);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(searchString);
  }, [searchString]);
  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); 
    };
  }, [])


  const isMobile = useIsMobile(); 
  const { addModule: addModuleToPlanner, changeTerm, planner, removeModule, hideSpecial } = usePlannerStore((state) => state);
  const { modules, addModule: addModuleToBank } = useModuleBankStore((state) => state);
  const [isOpen, setIsOpen] = React.useState<Set<string>>(new Set())
  
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const dest = result.destination.droppableId.split(DELIMITER);
    const src = result.source.droppableId.split(DELIMITER);
  
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

  const HandleAddMod = (module:Module) => {
    addModuleToBank(module)
    addModuleToPlanner(
      module.moduleCode,
      {
        year: MODSTOTAKE_YEAR as Year,
        term: MODSTOTAKE_TERM as Term,
        id: module.moduleCode,
      },
      {...modules, [module.moduleCode]: module},
    );
  };

  const handleRemoveModuleFromPlanner = (moduleCode: ModuleCode, year: Year, term: Term)=>{
    removeModule(moduleCode, year, term, modules)
  }

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

  const isSpecialHidden = usePlannerStore((state) => state.isSpecialHidden);
  const handleHideSpecial = (year: Year) =>{
    hideSpecial(year)
  }

  return (
    <div className="p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={cn("mb-6", isMobile ? "grid gap-6 grid-cols-1" : "flex flex-nowrap overflow-x-auto scroll-smooth scrollbar-hide")}>
          {Object.keys(planner).sort((a,b) => parseInt(a) - parseInt(b)).map((year) => {
            const terms = planner[year as Year]
            const isHidden = isSpecialHidden[year as Year]
            return (
            <div
              key={year}
              className={cn("overflow-hidden rounded-lg bg-gray-50 shadow-md flex flex-col",
              !isMobile && "flex-shrink-0 w-96 mr-6 mb-6")}
            >
              <div className={cn("flex justify-between bg-blue-500 p-3 items-center h-14", 
                isMobile && "cursor-pointer")}
                onClick={() => isMobile && toggleYear(year)}
              >
                <h2 className="text-lg font-semibold text-white">
                    {year === EXEMPTION_YEAR
                      ? "Exemptions"
                      : year === MODSTOTAKE_YEAR
                      ? "Plan to Take"
                      : `Year ${year}`
                    }
                </h2>
                {/* {year !== EXEMPTION_YEAR && !isMobile && (
                <button
                    className="ml-2 px-3 py-1 bg-white text-blue-500 rounded-md"
                    onClick={() => handleHideSpecial(year as Year)} 
                  >
                    {isHidden ? "Show Special Terms" : "Hide Special Terms"}
                </button>
                )} */}
                {isMobile && (
                  !isMobile || isOpen.has(year)  ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />
                )}
              </div>
              {(!isMobile || isOpen.has(year)) && (
                <>
                {year !== EXEMPTION_YEAR &&(
                  <button
                      className="px-3 py-1 bg-white text-blue-500 font-medium rounded-md border border-blue-100 shadow-sm my-1 mx-2 hover:bg-gray-100"
                      onClick={() => handleHideSpecial(year as Year)} 
                    >
                      {isHidden ? "Show Special Terms" : "Hide Special Terms"}
                  </button>
                  )}
                {Object.entries(terms).map(([term, termModules]) => (
                  <Droppable
                    droppableId={`${year}${DELIMITER}${term}`}
                    key={`${year}${DELIMITER}${term}`}
                  >
                    {(provided, snapshot) => (
                      
                        <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={cn("p-3 transition-colors duration-200", snapshot.isDraggingOver ? "bg-blue-100" : "bg-gray-50", term === "Term 3A" && isHidden ? "hidden" : "", term === "Term 3B" && isHidden ? "hidden" : "", year === EXEMPTION_YEAR && !isMobile ? "flex-grow" : year === MODSTOTAKE_YEAR && !isMobile ? "flex-grow" : "min-h-[120px]")}
                        >
                        
                        <h3 className="mb-3 font-medium text-gray-700">
                          {(year === EXEMPTION_YEAR
                          ? ""
                          : year === MODSTOTAKE_YEAR
                          ? ""
                          : `${term}`)}
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
                                      <X className="size-5"/>
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
                </>
              )}
            </div>
          );
        })}
      </div>
    </DragDropContext>
      <div className="flex">
        <div className="flex-auto max-w-xl">
          <Input
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="w-full"
          placeholder="Search Module"
          >
          </Input>

          {showSuggestion && suggestionResults.length > 0 && (
            <ul className="md absolute mt-1 max-h-40 overflow-auto rounded border border-gray-300 bg-white text-sm shadow-lg">
              {suggestionResults.map((module, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={()=>HandleAddMod(module)}
                >
                  {module.moduleCode} - {module.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="ps-4">
          <Button
            onClick={async()=>{
              setSearchResult(suggestionResults)
              setShowSearchResult(true)
              setShowSuggestion(false)
            }}
            className="rounded bg-sky-500 px-3 py-2 font-bold text-white transition-colors duration-200 hover:bg-sky-600"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5">
        {showSearchResult ? searchResult.length > 0 ?
        (searchResult.map((module, index) => (
          <div key={index} className="col-span-5 p-2 border-b border-gray-200 grid grid-cols-2">
            <div className="col-span-1 py-2">
              <a href="#"><h3 className="font-semibold">{module.moduleCode}</h3></a>
              <p className="text-sm text-gray-600">{module.name}</p>
            </div>
            <div className="col-span-1 text-end py-2">
              <Button
              className="rounded bg-green-500 px-3 py-2 font-bold text-white transition-colors duration-200 hover:bg-green-600"
              onClick={()=>HandleAddMod(module)}>
                Add Module
              </Button>
            </div>
          </div>
        ))) : 
        (<div className="p-2"> No Result </div>)
        :
        (<div></div>)
        }
      </div>
      {/* <Button
        onClick={HandleAddMod}
        className="rounded bg-green-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-green-600"
      >
        Add Module
      </Button> */}
    </div>
  );
};

export default CoursePlanner;
