"use client";


import { useEffect, useState } from "react";

// import ui components
import { Check, ChevronDown, Search, Star, StarOff } from "lucide-react";
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
import ModuleDetails from "@/components/ModuleDetails"; 
import MiniDegreeProgressReport from "@/components/miniDegreeProgressReport";

// Importing module data and basket categories
import { modules } from "@/server/data/modules";
import { baskets } from "@/server/data/basket";


// Extract categories from baskets
const categories = baskets.map((basket) => basket.name);

// Function to save favorites to localStorage
const saveFavorites = (favorites: Set<string>) => {
    localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  };
  
  // Function to load favorites from localStorage
  const loadFavorites = (): Set<string> => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
  };
  

export default function CourseCatalogue() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "credit">("name");
  const [favorites, setFavorites] = useState<Set<string>>(loadFavorites()); // Load from localStorage
  const [filterByFavorites, setFilterByFavorites] = useState(false); // Toggle to filter by favorites

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  // Function to toggle a module as a favorite
  const toggleFavorite = (moduleCode: string) => {
    setFavorites((prev) => {
      const updatedFavorites = new Set(prev);
      if (updatedFavorites.has(moduleCode)) {
        updatedFavorites.delete(moduleCode); // Remove from favorites
      } else {
        updatedFavorites.add(moduleCode); // Add to favorites
      }
      return updatedFavorites;
    });
  };

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
      if (filterByFavorites && !favorites.has(module.moduleCode)) {
        return false;
      }

      return (
        moduleCategories.includes(module.moduleCode) &&
        (module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          module.moduleCode.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    })
    .reduce((acc, current) => {
      // Remove duplicates by checking moduleCode
      const found = acc.find((item) => item.moduleCode === current.moduleCode);
      if (!found) {
        acc.push(current);
      }
      return acc;
    }, [])
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return a.credit - b.credit;
      }
    });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Module Catalogue</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
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
      <div className="flex items-center mb-4">
        <Checkbox
          checked={filterByFavorites}
          onCheckedChange={(checked) => setFilterByFavorites(checked)}
        />
        <Label className="ml-2">Show Favorites Only</Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Filter by Categories */}
        <div className="space-y-2">
          <h2 className="font-semibold">Basket</h2>
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  setSelectedCategories(
                    checked
                      ? [...selectedCategories, category]
                      : selectedCategories.filter((c) => c !== category)
                  );
                }}
              />
              <Label htmlFor={`category-${category}`}>{category}</Label>
            </div>
          ))}
        </div>

        {/* Display Modules */}
        <div className="md:col-span-3">
          <h2 className="font-semibold mb-2">Modules ({filteredModules.length})</h2>
          <div className="grid gap-4">
            {filteredModules.map((module) => (
              // Wrap the module card with ModuleDetails to open the dialog when clicked
              <ModuleDetails moduleCode={module.moduleCode} key={module.moduleCode}>
                <div className="border p-4 rounded-lg cursor-pointer flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{module.name}</h3>
                    <p className="text-sm text-gray-600">
                      {module.moduleCode}  |  {module.credit} CU  |  Exam Date:{" "}
                      {module.exam ? new Date(module.exam.dateTime).toLocaleDateString() : "No Exam"}
                    </p>
                  </div>

                  {/* Favorite Icon */}
                  <button
                    className="text-yellow-500"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents triggering the dialog when clicking the star
                      toggleFavorite(module.moduleCode);
                    }}
                  >
                    {favorites.has(module.moduleCode) ? (
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
