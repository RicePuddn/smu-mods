"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PADDING } from "@/config";
import { type PlannerFull } from "@/stores/multiplePlanners";
import { useMultiplePlannerStore } from "@/stores/multiplePlanners/provider";
import { usePlannerStore } from "@/stores/planner/provider";

export default function Planner() {
  const [newPlannerName, setNewPlannerName] = useState("");

  const { planners, addPlanner } = useMultiplePlannerStore((state) => state);
  const { planner, plannerState, isSpecialHidden } = usePlannerStore(
    (state) => state,
  );

  useEffect(() => {
    if (!!planner && !!plannerState && !!isSpecialHidden) {
      addPlanner("Default", {
        planner,
        plannerState,
        isSpecialHidden,
      });
      localStorage.removeItem("planner");
    }
  }, [planner, plannerState, isSpecialHidden]);

  return (
    <div
      style={{
        padding: PADDING,
      }}
      className="space-y-4"
    >
      <div className="flex items-center justify-start gap-4">
        <h2 className="text-xl font-bold">Your Plans</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              <Plus className="mr-2 size-4" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Planner</DialogTitle>
              <DialogDescription>
                Add a new planner to your list
              </DialogDescription>
            </DialogHeader>
            <Input
              value={newPlannerName}
              onChange={(e) => setNewPlannerName(e.target.value)}
              placeholder="Planner Name"
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"destructive"}>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={() => addPlanner(newPlannerName)}>Add</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Object.entries(planners).map(([id, planner]) => (
          <PlannerCard key={id} planner={planner} id={id} />
        ))}
      </div>
    </div>
  );
}

function PlannerCard({ planner, id }: { planner: PlannerFull; id: string }) {
  return (
    <Link href={`/planner/${id}`}>
      <div className="rounded-md border-2 p-4 hover:border-primary/50">
        <h3 className="text-lg font-semibold">{planner.name}</h3>
        <p className="text-sm text-primary">
          {Object.keys(planner.plannerState.modules).length} modules
        </p>
      </div>
    </Link>
  );
}
