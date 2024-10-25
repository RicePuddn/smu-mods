import { CircleAlert, X } from "lucide-react";

import type { Term, Year } from "@/types/planner";
import type { ModuleCode } from "@/types/primitives/module";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import ModuleDetails from "../ModuleDetails";
import { InteractiveTooltip } from "./customTooltip";

interface ModuleCardProps {
  moduleCode: string;
  moduleName: string;
  year: Year;
  term: Term;
  provided: any;
  snapshot: any;
  conflictList?: string[];
  removeModule: (moduleCode: ModuleCode, year: Year, term: Term) => void;
}

const ModuleCard = ({
  moduleCode,
  moduleName,
  year,
  term,
  provided,
  snapshot,
  conflictList = [],
  removeModule,
}: ModuleCardProps) => {
  return (
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
      {conflictList.length > 0 && (
        <InteractiveTooltip
          content={
            <div>
              {conflictList.map((conflictMsg, idx) => (
                <li key={idx}>{conflictMsg}</li>
              ))}
              <p>Click on Module for more information</p>
            </div>
          }
        >
          <CircleAlert color="orange" size={18} />
        </InteractiveTooltip>
      )}

      <ModuleDetails moduleCode={moduleCode as ModuleCode}>
        <div className="flex-grow text-sm">
          {/* <div className="w-fit text-nowrap pe-1"></div>
          <div></div> */}
          {moduleCode}: {moduleName}
        </div>
      </ModuleDetails>

      <Button
        onClick={() => removeModule(moduleCode as ModuleCode, year, term)}
        variant="destructive"
        size="icon"
        className="size-6 min-w-6 rounded-full"
      >
        <X className="size-5" />
      </Button>
    </div>
  );
};

export default ModuleCard;
