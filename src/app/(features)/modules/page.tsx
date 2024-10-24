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
import { ScrollArea } from "@/components/ui/scroll-area";
import { PADDING } from "@/config";
import { useModuleBankStore } from "@/stores/moduleBank/provider";
import { type Module } from "@/types/primitives/module";

export default function CourseCatalogue() {
  // Extract categories from baskets
  const { modules, toggleFavourites, favouriteModules, baskets } =
    useModuleBankStore((state) => state);
  // const categories = baskets.map((basket) => basket.name);

  const [selectedCategories, _setSelectedCategories] = useState<string[]>([]);
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
      className="relative w-full space-y-4"
      style={{
        paddingTop: PADDING,
        paddingLeft: PADDING,
        paddingRight: PADDING,
      }}
    >
      <h1 className="text-2xl font-bold">Module Catalogue</h1>
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Search Bar */}
        <div className="flex-1">
          <Input
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        {/* Sort By Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              Sort by {sortBy === "name" ? "Name" : "Credit"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={sortBy === "name"}
              onCheckedChange={() => setSortBy("name")}
            >
              Name
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={sortBy === "credit"}
              onCheckedChange={() => setSortBy("credit")}
            >
              Credit
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Toggle Filter by Favorites */}
      <div className="flex items-center">
        <Checkbox
          checked={filterByFavorites}
          onCheckedChange={(checked) => setFilterByFavorites(Boolean(checked))}
        />
        <Label className="ml-2">Show Favorites Only</Label>
      </div>
      <div className="flex gap-4">
        {/* Filter by Categories */}
        {/* <div className="w-fit max-w-24 space-y-2 md:max-w-none">
          <h2 className="font-semibold">Basket</h2>
          <ScrollArea className="h-[calc(100dvh-20.5rem)] w-full md:h-[calc(100dvh-17.5rem)]">
            {categories.map((category, index) => (
              <div key={index} className="mb-2 flex items-center space-x-2">
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
                />
                <Label htmlFor={`category-${category}`}>{category}</Label>
              </div>
            ))}
          </ScrollArea>
        </div> */}

        {/* Display Modules */}
        <div className="flex-grow">
          <h2 className="mb-2 font-semibold">
            Modules ({filteredModules.length})
          </h2>
          <ScrollArea className="h-[calc(100dvh-20.5rem)] w-full md:h-[calc(100dvh-17.5rem)]">
            {filteredModules.map((module) => (
              // Wrap the module card with ModuleDetails to open the dialog when clicked
              <ModuleDetails
                moduleCode={module.moduleCode}
                key={module.moduleCode}
              >
                <div className="mb-2 flex cursor-pointer items-center justify-between rounded-lg border p-4">
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
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
