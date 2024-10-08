"use client"

import { useState } from "react";
import { modules } from "@/server/data/modules";
import ModuleDetails from "@/components/ModuleDetails";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Helper function to truncate text
const CourseCatalogue = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim();
};

export default function ModuleCatalogue() {
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [filteredModules, setFilteredModules] = useState(Object.values(modules)); // State for filtered modules

  // Handle search logic
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter the modules based on the search query
    const results = Object.values(modules).filter((module) =>
      module.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      module.moduleCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredModules(results); // Update the filteredModules state
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-[#2E4B70] min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#F4F1E9' }}>Module Catalogue</h1>
        <p className="text-muted-foreground" style={{ color: '#F4F1E9' }}>Explore our diverse range of academic offerings</p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2 mx-auto my-4">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </header>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.length > 0 ? (
          filteredModules.map((module) => (
            <ModuleDetails key={module.moduleCode} moduleCode={module.moduleCode}>
              <Card className="transition-shadow hover:shadow-lg hover:shadow-white/50 duration-300" style={{ backgroundColor: '#F4F1E9' }}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{module.name}</span>
                    <span className="text-sm font-normal text-muted-foreground">{module.moduleCode}</span>
                  </CardTitle>
                  <CardDescription>
                    {module.credit} credits | 
                    {module.exam ? ` Exam Date: ${module.exam.dateTime.toLocaleDateString()}` : " No Exam"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground cursor-pointer ">
                    {CourseCatalogue(module.description, 100)} [...]
                    {/* <span className="text-primary font-semibold"> Read more</span> */}
                  </p>
                </CardContent>
              </Card>
            </ModuleDetails>
          ))
        ) : (
          <p className="text-white text-center col-span-3">No modules found.</p>
        )}
      </div>
    </div>
  );
}