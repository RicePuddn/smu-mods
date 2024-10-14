"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { modules } from "@/server/data/modules";
import { baskets } from "@/server/data/basket";

// Extract categories from baskets
const categories = baskets.map((basket) => basket.name);

export default function MiniDegreeProgressReport() {
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set()); // Track completed modules

  // Function to check how many modules the user has taken from each category
  const getModulesCompletedInCategory = (category: string) => {
    const basket = baskets.find((basket) => basket.name === category);
    const modulesInCategory = basket ? basket.modules : [];
    const completed = modulesInCategory.filter((moduleCode) =>
      completedModules.has(moduleCode)
    );
    return completed.length;
  };

  // Function to get total number of required CUs for each basket
  const getTotalCUsInCategory = (category: string) => {
    const basket = baskets.find((basket) => basket.name === category);
    return basket ? basket.required : 0; // Get required CUs from the basket object
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mini Degree Progress Report</h1>

      {/* Basket Progress Report */}
      <div className="flex flex-col space-y-4">
        <h2 className="font-semibold mb-2">Progress Report by Baskets</h2>
        <div className="space-y-2">
          {baskets.map((basket) => (
            <div key={basket.name} className="text-sm">
              <p>
                {basket.name}: {getModulesCompletedInCategory(basket.name)} out of {getTotalCUsInCategory(basket.name)} CU
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Modules */}
      <div className="mt-6">
        <h2 className="font-semibold mb-2">Mark Completed Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {Object.values(modules).map((module) => (
            <div key={module.moduleCode} className="flex items-center space-x-2">
              <Checkbox
                checked={completedModules.has(module.moduleCode)}
                onCheckedChange={(checked) => {
                  setCompletedModules((prev) => {
                    const updated = new Set(prev);
                    if (checked) {
                      updated.add(module.moduleCode); // Mark as completed
                    } else {
                      updated.delete(module.moduleCode); // Remove from completed
                    }
                    return updated;
                  });
                }}
              />
              <Label>{module.name}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}