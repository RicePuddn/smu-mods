"use client";

import { useState } from "react";
import { ChevronDown, Star, StarOff } from "lucide-react";

// import ui components
import ModuleDetails from "@/components/ModuleDetails";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Importing module data and basket categories
import { PADDING } from "@/config";
import { useModuleBankStore } from "@/stores/moduleBank/provider";
import { type Module } from "@/types/primitives/module";

export default function CourseCatalogue() {
  // Extract categories from baskets
  const { modules, toggleFavourites, favouriteModules, baskets } =
    useModuleBankStore((state) => state);
  const categories = baskets.map((basket) => basket.name);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "credit">("name");
  const [filterByFavorites, setFilterByFavorites] = useState(false); // Toggle to filter by favorites

  // Function to get all modules in a selected category
  const getModulesByCategory = (category: string) => {
    const basket = baskets.find((basket) => basket.name === category);
    return basket ? basket.modules : [];
  };

  // Get all modules from the baskets based on selected categories and deduplicate
  const filteredModules = Object.values(modules)
    .filter((module) => {
      const moduleCategories = selectedCategories.length
        ? selectedCategories.flatMap(getModulesByCategory) // Get all module codes for selected categories
        : Object.keys(modules); // If no category is selected, show all modules

      // If filter by favorites is enabled, show only favorite modules
      if (filterByFavorites && !favouriteModules.includes(module.moduleCode)) {
        return false;
      }

      return (
        moduleCategories.includes(module.moduleCode) &&
        (module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          module.moduleCode.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    })
    .reduce((acc, current) => {
      const found = acc.find((item) => item.moduleCode === current.moduleCode);
      if (!found) {
        acc.push(current);
      }
      return acc;
    }, [] as Module[])
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return a.credit - b.credit;
      }
    });

  return (
    <div
      className="w-full"
      style={{
        padding: PADDING,
      }}
    >
      <h1 className="mb-4 text-2xl font-bold">Module Catalogue</h1>

      <div className="mb-4 flex flex-col gap-4 md:flex-row sticky style={{ minHeight: '100vh' }">
        {/* Search Bar */}
        <div className="flex-1 mb-4 sticky top-0 z-10 bg-white">
          <Input
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </div>


      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Filter by Categories */}
        <div className="space-y-2 top-0 bg-white shadow-lg p-6 rounded-xl sticky w-fit h-fit">
        <Checkbox
          checked={filterByFavorites}
          onCheckedChange={(checked) => setFilterByFavorites(Boolean(checked))}
          className="hover:border-blue-500 hover:bg-blue-100"
        />
        <Label className="ml-2">Show Favorites Only</Label>
          <h2 className="font-semibold">Sort By Basket</h2>
          {categories.map((category, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  setSelectedCategories(
                    checked
                      ? [...selectedCategories, category]
                      : selectedCategories.filter((c) => c !== category),
                  );
                }}
                className="hover:border-blue-500 hover:bg-blue-100"
              />
              <Label htmlFor={`category-${category}`}>{category}</Label>
            </div>
          ))}
        </div>

        {/* Display Modules */}
        <div className="md:col-span-3">
          <h2 className="mb-2 font-semibold">
            Modules ({filteredModules.length})
          </h2>
          <div className="grid gap-4">
            {filteredModules.map((module) => (
              // Wrap the module card with ModuleDetails to open the dialog when clicked
              <ModuleDetails
                moduleCode={module.moduleCode}
                key={module.moduleCode}
              >
                <div className="flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:border-blue-500 hover:shadow-[0_4px_15px_0_rgba(59,130,246,0.6)] transition-all duration-200  transform hover:-translate-y-1">
                  <div>
                    <h3 className="font-semibold">{module.name}</h3>
                    <p className="text-sm text-foreground/70">
                      {module.moduleCode} | {module.credit} CU | Exam Date:{" "}
                      {module.exam
                        ? new Date(module.exam.dateTime).toLocaleDateString()
                        : "No Exam"}
                    </p>
                  </div>

                  {/* Favorite Icon */}
                  <button
                    className="text-yellow-500"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents triggering the dialog when clicking the star
                      toggleFavourites(module.moduleCode);
                    }}
                  >
                    {favouriteModules.includes(module.moduleCode) ? (
                      <Star className="h-6 w-6 fill-current" />
                    ) : (
                      <StarOff className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </ModuleDetails>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
