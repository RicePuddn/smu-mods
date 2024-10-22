"use client";

import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  ChevronDown,
  ChevronUp,
  CircleAlert,
  RefreshCw,
  X,
} from "lucide-react";
import React, { useState } from "react";

import { PADDING } from "@/config";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useConfigStore } from "@/stores/config/provider";
import { useModuleBankStore } from "@/stores/moduleBank/provider";
import { usePlannerStore } from "@/stores/planner/provider";
import { useTimetableStore } from "@/stores/timetable/provider";
import type { Term, Year } from "@/types/planner";
import {
  EXEMPTION_YEAR,
  MODSTOTAKE_TERM,
  MODSTOTAKE_YEAR,
} from "@/types/planner";
import type { Module, ModuleCode } from "@/types/primitives/module";

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
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);

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
  const {
    addModule: addModuleToPlanner,
    changeTerm,
    planner,
    removeModule,
    hideSpecial,
  } = usePlannerStore((state) => state);
  const { modules, addModule: addModuleToBank } = useModuleBankStore(
    (state) => state,
  );
  const { AddModuleToTimetable: addModuleTimetable } = useTimetableStore(
    (state) => state,
  );
  const { timetableTheme } = useConfigStore((state) => state);
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

  const HandleSyncTimetable = (year: Year) => {
    for (const termNo in planner[year]) {
      console.log(planner);
      const moduleCodes = Object.keys(
        planner[year][termNo as Term],
      ) as ModuleCode[];
      moduleCodes.forEach((moduleCode) => {
        const module = modules[moduleCode];
        if (!!module) {
          addModuleTimetable(module, termNo as Term, timetableTheme);
        }
      });
    }
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
  const handleHideSpecial = (year: Year) => {
    hideSpecial(year);
  };

  return (
    <div
      style={{
        paddingTop: PADDING,
        paddingLeft: PADDING,
        paddingBottom: PADDING,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className={cn(
            "mb-6",
            isMobile
              ? "grid grid-cols-1 gap-6"
              : "scrollbar-hide flex flex-nowrap overflow-x-auto scroll-smooth px-1",
          )}
          style={{
            paddingRight: !!isMobile ? PADDING : "0rem",
          }}
        >
          {Object.keys(planner)
            .filter((year) => year !== MODSTOTAKE_YEAR)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map((year) => {
              const terms = planner[year as Year];
              const isHidden = isSpecialHidden[year as Year];
              return (
                <div
                  key={year}
                  className={cn(
                    "flex flex-col overflow-hidden rounded-lg bg-accent shadow-md",
                    !isMobile && "mb-6 mr-6 w-96 flex-shrink-0",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-14 items-center justify-between bg-primary p-3",
                      isMobile && "cursor-pointer",
                    )}
                    onClick={() => isMobile && toggleYear(year)}
                  >
                    <h2 className="text-lg font-semibold text-primary-foreground">
                      {year === EXEMPTION_YEAR
                        ? "Exemptions"
                        : year === MODSTOTAKE_YEAR
                          ? "Plan to Take"
                          : `Year ${year}`}
                    </h2>
                    {!isMobile && (
                      <Button
                        onClick={() => HandleSyncTimetable(year as Year)}
                        size={"icon"}
                      >
                        <RefreshCw className="size-4" />
                      </Button>
                    )}
                    {/* {year !== EXEMPTION_YEAR && !isMobile && (
                <button
                    className="ml-2 px-3 py-1 bg-white text-blue-500 rounded-md"
                    onClick={() => handleHideSpecial(year as Year)} 
                  >
                    {isHidden ? "Show Special Terms" : "Hide Special Terms"}
                </button>
                )} */}
                    {isMobile &&
                      (!isMobile || isOpen.has(year) ? (
                        <ChevronUp className="text-white" />
                      ) : (
                        <ChevronDown className="text-white" />
                      ))}
                  </div>
                  {(!isMobile || isOpen.has(year)) && (
                    <>
                      {year !== EXEMPTION_YEAR && (
                        <div className="flex-cols flex">
                          <Button
                            onClick={() => handleHideSpecial(year as Year)}
                            className="mx-2 mt-2 w-full"
                            variant={"outline"}
                          >
                            {isHidden
                              ? "Show Special Terms"
                              : "Hide Special Terms"}
                          </Button>

                          {isMobile && (
                            <Button
                              onClick={() => HandleSyncTimetable(year as Year)}
                              size={"icon"}
                            >
                              <RefreshCw className="size-4" />
                            </Button>
                          )}
                        </div>
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
                              className={cn(
                                "p-3 transition-colors duration-200",
                                snapshot.isDraggingOver
                                  ? "bg-blue-100/10"
                                  : "bg-muted",
                                term === "Term 3A" && isHidden ? "hidden" : "",
                                term === "Term 3B" && isHidden ? "hidden" : "",
                                year === EXEMPTION_YEAR && !isMobile
                                  ? "flex-grow"
                                  : year === MODSTOTAKE_YEAR && !isMobile
                                    ? "flex-grow"
                                    : "min-h-[120px]",
                              )}
                            >
                              <h3 className="mb-3 font-medium text-foreground">
                                {year === EXEMPTION_YEAR
                                  ? ""
                                  : year === MODSTOTAKE_YEAR
                                    ? ""
                                    : `${term}`}
                              </h3>

                              {Object.entries(termModules).map(
                                ([moduleCode, { conflicts }], index) => {
                                  const conflictList: string[] = [];

                                  // For each module, check the conflicts present
                                  if (conflicts && year !== EXEMPTION_YEAR) {
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    Object.entries(conflicts).map(
                                      ([_, conflict]) => {
                                        if (
                                          conflict.type === "prereq" &&
                                          (conflict.statusNode?.children
                                            ?.length ?? 0) > 0
                                        ) {
                                          const reqGate =
                                            conflict.statusNode?.type ?? "";
                                          const sliceAmt = reqGate.length + 2;
                                          let msg =
                                            "These modules may need to be taken first: ";
                                          for (const preReqMod of conflict
                                            ?.statusNode?.children ?? []) {
                                            if (!preReqMod.fulfilled) {
                                              msg += `${preReqMod.module} ${reqGate} `;
                                            }
                                          }
                                          conflictList.push(
                                            msg.slice(0, -sliceAmt),
                                          );
                                        }

                                        if (conflict.type === "term") {
                                          let msg =
                                            "Terms offering this module: ";
                                          for (const termOffered of conflict.termsOffered) {
                                            msg += `${termOffered}, `;
                                          }
                                          conflictList.push(msg.slice(0, -2));
                                        }

                                        if (conflict.type === "exam") {
                                          if (
                                            conflict.conflictModules.length > 1
                                          ) {
                                            let msg =
                                              "This module has clashing exam timings with: ";
                                            for (const modExam of conflict.conflictModules) {
                                              if (moduleCode !== modExam) {
                                                msg += `${modExam}, `;
                                              }
                                            }
                                            conflictList.push(msg.slice(0, -2));
                                          }
                                        }
                                      },
                                    );
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
                                          className={cn(
                                            "mb-2 flex items-center justify-between gap-2 rounded border p-2 transition-all duration-200",
                                            snapshot.isDragging
                                              ? "h-fit w-fit bg-accent shadow-lg"
                                              : "border bg-background hover:border-foreground",
                                          )}
                                        >
                                          {conflictList &&
                                            conflictList.length > 0 && (
                                              <InteractiveTooltip
                                                content={
                                                  <div>
                                                    {conflictList.map(
                                                      (conflictMsg, idx) => {
                                                        return (
                                                          <li key={idx}>
                                                            {conflictMsg}
                                                          </li>
                                                        );
                                                      },
                                                    )}
                                                  </div>
                                                }
                                              >
                                                <CircleAlert
                                                  color="orange"
                                                  size={18}
                                                />
                                              </InteractiveTooltip>
                                            )}
                                          <div className="flex-grow">
                                            {moduleCode}
                                          </div>
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
                                            className={cn(
                                              "size-6 rounded-full",
                                              snapshot.isDragging && "hidden",
                                            )}
                                          >
                                            <X className="size-5" />
                                          </Button>
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                },
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

        <div
          className={cn(
            "mb-6",
            isMobile
              ? "sticky top-12 z-10 grid grid-cols-1 gap-6"
              : "flex flex-wrap px-1",
          )}
          style={{
            paddingRight: PADDING,
          }}
        >
          <div
            key={MODSTOTAKE_YEAR}
            className={cn(
              "flex flex-col overflow-hidden rounded-lg bg-gray-50 shadow-md",
              !isMobile && "mb-6 mr-6 w-full flex-shrink-0",
            )}
          >
            <div
              className={cn(
                "flex h-14 items-center justify-between bg-primary p-3",
                isMobile && "cursor-pointer",
              )}
              onClick={() => isMobile && toggleYear(MODSTOTAKE_YEAR)}
            >
              <h2 className="text-lg font-semibold text-primary-foreground">
                Plan to Take
              </h2>

              {isMobile &&
                (!isMobile || isOpen.has(MODSTOTAKE_YEAR) ? (
                  <ChevronUp className="text-white" />
                ) : (
                  <ChevronDown className="text-white" />
                ))}
            </div>
            <div>
              {(!isMobile || isOpen.has(MODSTOTAKE_YEAR)) &&
                Object.entries(planner[MODSTOTAKE_YEAR as Year]).map(
                  ([term, termModules]) => (
                    <Droppable
                      droppableId={`${MODSTOTAKE_YEAR}${DELIMITER}${term}`}
                      key={`${MODSTOTAKE_YEAR}${DELIMITER}${term}`}
                      direction="horizontal"
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={cn(
                            "grid grid-cols-2 gap-4 p-3 transition-colors duration-200 md:grid-cols-3 lg:grid-cols-4",
                            snapshot.isDraggingOver
                              ? "bg-blue-100/10"
                              : "bg-muted",
                            !isMobile && "flex-grow",
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
                                      "flex items-center justify-between gap-2 rounded p-2 transition-all duration-200",
                                      snapshot.isDragging
                                        ? "h-fit w-fit bg-accent shadow-lg"
                                        : "border bg-background hover:border-foreground",
                                    )}
                                  >
                                    <div className="flex-grow">
                                      {moduleCode}
                                    </div>
                                    <Button
                                      onClick={() =>
                                        handleRemoveModuleFromPlanner(
                                          moduleCode as ModuleCode,
                                          MODSTOTAKE_YEAR as Year,
                                          MODSTOTAKE_TERM as Term,
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
                  ),
                )}
            </div>
          </div>
        </div>
      </DragDropContext>
      <div
        className="flex flex-col"
        style={{
          paddingRight: PADDING,
        }}
      >
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
            <SearchModule
              handleModSelect={HandleAddMod}
              callback={(modules) => {
                //u can do whatever u want with the modules here
                setSuggestionResults(modules);
              }}
            />
          </div>
          <div className="mx-3 my-6">
            <Button
              onClick={async () => {
                setSearchResult(suggestionResults);
                setShowSearchResult(true);
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
          {showSearchResult ? (
            searchResult.length > 0 ? (
              searchResult.map((module, index) => (
                <div
                  key={index}
                  className="col-span-5 grid grid-cols-2 border-b p-2"
                >
                  <div className="col-span-1 py-2">
                    <a href="#">
                      <h3 className="font-semibold">{module.moduleCode}</h3>
                    </a>
                    <p className="text-sm text-foreground/50">{module.name}</p>
                  </div>
                  <div className="col-span-1 py-2 text-end">
                    <Button
                      className="rounded bg-green-500 px-3 py-2 font-bold text-white transition-colors duration-200 hover:bg-green-600"
                      onClick={() => HandleAddMod(module)}
                    >
                      Add Module
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2"> No Result </div>
            )
          ) : (
            <div></div>
          )}
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
