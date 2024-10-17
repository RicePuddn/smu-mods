"use client";

import { searchModule } from "@/server/data/modules";
import { useModuleBankStore } from "@/stores/moduleBank/provider";
import type { Module } from "@/types/primitives/module";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface SearchModuleProps {
  handleModSelect: (mod: Module) => void;
}

export function SearchModule({ handleModSelect }: SearchModuleProps) {
  const { modules } = useModuleBankStore((state) => state);
  const [inputValue, setInputValue] = useState<string>("");

  const [searchResults, setSearchResults] = useState<Module[]>([]);

  useEffect(() => {
    setSearchResults(searchModule(modules, inputValue));
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
          />
        </div>
        {inputValue == "" ? (
          <Label>Please type in search input.</Label>
        ) : (
          <ul className="md absolute left-0 right-0 z-10 mt-2 max-h-40 overflow-auto rounded border border-gray-300 bg-white text-sm shadow-lg">
            {searchResults.length == 0 ? (
              <Label>No modules found.</Label>
            ) : (
              searchResults.map((mod, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-100"
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
        )}
      </div>
    </div>
  );
}
