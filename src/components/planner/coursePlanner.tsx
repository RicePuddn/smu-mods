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
  type Year
} from "@/types/planner";
import type { Module, ModuleCode } from "@/types/primitives/module";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { ChevronDown, ChevronUp, CircleAlert, X } from "lucide-react";
import React, { useState } from "react";
import { SearchModule } from "../SearchModule";
import { Button } from "../ui/button";
import { InteractiveTooltip } from "./customTooltip";
import "./scrollBar.css";

const DELIMITER = "/$/";

const CoursePlanner: React.FC = () => {

  // const {mutateAsync} = api.module.searchModule.useMutation(
  //   // {
  //   // onSuccess: (data)=>{
  //   //   setSuggestionResults(data);
  //   //   setShowSuggestion(true);
  //   // }
  //   // }
  // ) 

  // const [searchString, setSearchString] = useState("");
  const [suggestionResults, setSuggestionResults] = useState<Module[]>([]);
  // const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Module[]>([]);
  const [showSearchResult, setShowSearchResult]= useState<boolean>(false);

  // const debouncedSearch = debounce((query: string) => {
  //   if (query.length > 0) {
  //     mutateAsync({
  //       query: searchString
  //     }).then((results) => {
  //       setSuggestionResults(results);
  //       setShowSuggestion(true);
  //     });
  //   } else {
  //     setShowSuggestion(false);
  //   }
  // }, 300);

  // useEffect(() => {
  //   debouncedSearch(searchString);
  // }, [searchString]);
  // useEffect(() => {
  //   return () => {
  //     debouncedSearch.cancel(); 
  //   };
  // }, [])


  const isMobile = useIsMobile(); 
  const { addModule: addModuleToPlanner, changeTerm, planner, plannerState, removeModule, hideSpecial } = usePlannerStore((state) => state);
  const { modules, addModule: addModuleToBank } = useModuleBankStore((state) => state);
  const [isOpen, setIsOpen] = React.useState<Set<string>>(new Set())
  
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

  const isSpecialHidden = usePlannerStore((state) => state.isSpecialHidden);
  const handleHideSpecial = (year: Year) =>{
    hideSpecial(year)
  }

  return (
    <div className="p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={cn("mb-6", isMobile ? "grid gap-6 grid-cols-1" : "flex flex-nowrap overflow-x-auto scroll-smooth scrollbar-hide px-1")}>
          {Object.keys(planner).filter(year => year !== MODSTOTAKE_YEAR).sort((a,b) => parseInt(a) - parseInt(b)).map((year) => { 
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
                          ([moduleCode, { conflicts }], index) => {
                            console.log(moduleCode,conflicts);
                            const conflictList: string[] = [];

                            // For each module, check the conflicts present
                            if(conflicts && year !== EXEMPTION_YEAR){
                              // eslint-disable-next-line @typescript-eslint/no-unused-vars
                              Object.entries(conflicts).map(([index, conflict]) => {
                                if(conflict.type === "prereq" && (conflict.statusNode?.children?.length?? 0) > 0){
                                  const reqGate= conflict.statusNode?.type ?? "";
                                  const sliceAmt= reqGate.length + 2
                                  let msg= "These modules may need to be taken first: "
                                  for (const preReqMod of conflict?.statusNode?.children ?? []) {
                                    if (!preReqMod.fulfilled) {
                                      msg += `${preReqMod.module} ${reqGate} `;
                                    }
                                  }
                                  conflictList.push(msg.slice(0, -sliceAmt))
                                }
                                
                                if(conflict.type === "term"){
                                  let msg= "Terms offering this module: ";
                                  for(const termOffered of conflict.termsOffered){
                                    msg += `${termOffered}, `
                                }
                                  conflictList.push(msg.slice(0, -2))
                                }

                                if(conflict.type === "exam"){
                                  if(conflict.conflictModules.length > 1){
                                    let msg= "This module has clashing exam timings with: "
                                    for(const modExam of conflict.conflictModules){
                                      if(moduleCode !== modExam){
                                        msg += `${modExam}, `
                                      }
                                    }
                                    conflictList.push(msg.slice(0, -2))
                                  }
                                }
                              })
                            }

                            return (
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
                                  {conflictList && conflictList.length > 0 && 
                                    <InteractiveTooltip content={
                                      <div className="bg-slate-50 text-black">
                                        {conflictList.map((conflictMsg, idx)=> {
                                          return (
                                            <li key={idx}>{conflictMsg}</li>
                                          )})}
                                      </div>
                                    }
                                    >
                                      <CircleAlert color="orange" size={18} />
                                    </InteractiveTooltip>
                                  }
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
                          );}
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

      <div className={cn("mb-6", isMobile ? "grid gap-6 grid-cols-1 sticky top-12 z-10" : "flex flex-wrap px-1")}>
        <div
          key={MODSTOTAKE_YEAR}
          className={cn("overflow-hidden rounded-lg bg-gray-50 shadow-md flex flex-col",
          !isMobile && "flex-shrink-0 w-full mr-6 mb-6")}
        >
        <div className={cn("flex justify-between bg-blue-500 p-3 items-center h-14", 
          isMobile && "cursor-pointer")}
          onClick={() => isMobile && toggleYear(MODSTOTAKE_YEAR)}
        >
        <h2 className="text-lg font-semibold text-white">   
          Plan to Take     
        </h2>
                
        {isMobile && (
          !isMobile || isOpen.has(MODSTOTAKE_YEAR)  ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />
        )}

        </div>
        <div>
          {(!isMobile || isOpen.has(MODSTOTAKE_YEAR)) && (
            Object.entries(planner[MODSTOTAKE_YEAR as Year]).map(([term, termModules])=>
              <Droppable
                droppableId={`${MODSTOTAKE_YEAR}${DELIMITER}${term}`}
                key={`${MODSTOTAKE_YEAR}${DELIMITER}${term}`}
              >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn("p-3 transition-colors duration-200 min-h-[120px] grid gap-2 lg:grid-cols-3 grid-cols-2", snapshot.isDraggingOver ? "bg-blue-100" : "bg-gray-50", !isMobile && "flex-grow")}
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
                        className={cn("flex mb-2 rounded p-2 transition-all duration-200 justify-between items-center",
                        snapshot.isDragging
                          ? "bg-blue-200 shadow-lg"
                          : "border border-gray-200 bg-white hover:bg-gray-100"
                        )}
                        >
                          <div className="w-5/6">{moduleCode}</div>
                            <Button
                              onClick={() => handleRemoveModuleFromPlanner(moduleCode as ModuleCode, MODSTOTAKE_YEAR as Year, MODSTOTAKE_TERM as Term)}
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
              ))
              }
            </div>
          </div>
        </div>
    </DragDropContext>
      <div className="flex flex-col">
        {/*<div className="flex-auto">
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
        */}
        <div className="flex">
        <div className="w-full">
          <SearchModule handleModSelect={HandleAddMod} callback={(modules)=> {
          //u can do whatever u want with the modules here
            setSuggestionResults(modules)
          }}/>
        </div>
        <div className="my-6 mx-3">
          <Button
            onClick={async()=>{
              setSearchResult(suggestionResults)
              setShowSearchResult(true)
              // setShowSuggestion(false)
            }}
            className="rounded bg-sky-500 px-3 py-2 font-bold text-white transition-colors duration-200 hover:bg-sky-600"
          >
            Search
          </Button>
        </div>
        </div>
        <br />
        <div className="grid grid-cols-5">
          {showSearchResult ? searchResult.length > 0 ?
          (searchResult.map((module, index) => (
            <div key={index} className="col-span-5 p-2 border-b border-gray-200 grid grid-cols-2">
              <div className="col-span-1 py-2">
                <a href="#"><h3 className="font-semibold">{module.moduleCode}</h3></a>
                <p className="text-sm text-gray-600">{module.name}</p>
              </div>
              {module.moduleCode in plannerState.modules ? (
              <div className="col-span-1 text-end py-2">
                <Button
                className="rounded bg-slate-400 px-3 py-2 font-bold text-white transition-colors duration-200 hover:bg-slate-600 min-w-28"
                onClick={()=>handleRemoveModuleFromPlanner(module.moduleCode as ModuleCode, plannerState.modules[module.moduleCode]?.year as Year, plannerState.modules[module.moduleCode]?.term as Term)}>
                  Remove
                </Button>
              </div>
              ) :
              (<div className="col-span-1 text-end py-2">
                <Button
                className="rounded bg-green-500 px-3 py-2 font-bold text-white transition-colors duration-200 hover:bg-green-600 min-w-28"
                onClick={()=>HandleAddMod(module)}>
                  Add Module
                </Button>
              </div>)}
            </div>
          ))) : 
          (<div className="p-2"> No Result </div>)
          :
          (<div></div>)
          }
        </div>
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
