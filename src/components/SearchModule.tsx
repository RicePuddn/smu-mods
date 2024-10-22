"use client";

import { useEffect, useState } from "react";

import type { Module } from "@/types/primitives/module";
import { searchModule } from "@/server/data/modules";
import { useModuleBankStore } from "@/stores/moduleBank/provider";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface SearchModuleProps {
  handleModSelect: (mod: Module) => void;
  showResults?: boolean;
  callback?: (modules: Module[]) => void;
}

export function SearchModule({
  handleModSelect,
  callback,
  showResults = true,
}: SearchModuleProps) {
  const { modules } = useModuleBankStore((state) => state);
  const [inputValue, setInputValue] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  const [searchResults, setSearchResults] = useState<Module[]>([]);

  useEffect(() => {
    setSearchResults(searchModule(modules, inputValue));
    if (callback) {
      callback(searchModule(modules, inputValue));
    }
  }, [inputValue]);
  return (
    <div className="flex justify-center gap-24">
      <div className="relative w-full space-y-2">
        <div>
          <Label htmlFor="searchModule">Search for a module</Label>
          <Input
            variant="timetable"
            placeholder="Enter a module code or module name"
            value={inputValue}
            id="searchModule"
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setFocused(false);
              }, 50);
            }}
          />
        </div>
        {!showResults ? (
          <></>
        ) : inputValue == "" ? (
          <Label>Please type in search input.</Label>
        ) : (
          focused && (
            <ul className="md absolute left-0 right-0 z-10 mt-2 max-h-40 overflow-auto rounded border bg-background text-sm shadow-lg">
              {searchResults.length == 0 ? (
                <li className="p-2">No results found.</li>
              ) : (
                searchResults.map((mod, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-2 hover:bg-accent"
                    onClick={() => {
                      setInputValue("");
                      handleModSelect(mod);
                    }}
                  >
                    {mod.moduleCode} - {mod.name}
                  </li>
                ))
              )}
            </ul>
          )
        )}
      </div>
    </div>
  );
}
