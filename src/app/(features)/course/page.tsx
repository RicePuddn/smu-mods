"use client";

import ModuleDetails from "@/components/ModuleDetails";

export default function CoursePage() {
  return (
    <div>
      <h1>Course Page</h1>
      <ModuleDetails moduleCode="IS216">
        <button>View Details</button>
        {/* Change above line you can pass in any react component and when user clicks on this Dialog will pop up  */}
      </ModuleDetails>
    </div>
  );
}
