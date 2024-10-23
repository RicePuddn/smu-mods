"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Monitor,
  Moon,
  RefreshCw,
  RotateCcw,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import type { RoomKey } from "@/components/threed/rooms";
import type { AcademicYear } from "@/config";
import type { TimetableThemeName } from "@/utils/timetable/colours";
import { GenerateQRCode } from "@/components/iSync/QRCode";
import { Rooms } from "@/components/threed/rooms";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PADDING } from "@/config";
import { cn } from "@/lib/utils";
import { useConfigStore } from "@/stores/config/provider";
import { useModuleBankStore } from "@/stores/moduleBank/provider";
import { TIMETABLE_THEMES } from "@/utils/timetable/colours";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [tempTheme, setTempTheme] = useState<string | undefined>("system");
  const {
    roomTheme,
    changeRoomTheme,
    timetableTheme,
    changeTimetableTheme,
    matriculationYear,
    changeMatriculationYear,
  } = useConfigStore((state) => state);
  const { refreshAll } = useModuleBankStore((state) => state);

  // Matriculation Year options
  const currentYear = new Date().getFullYear();
  const matriculationYears = [];
  for (let i = currentYear - 5; i <= currentYear + 1; i++) {
    matriculationYears.push(`${i}/${i + 1}`);
  }

  function changeTheme(theme: string) {
    setTheme(theme);
    setTempTheme(theme);
  }

  useEffect(() => {
    setTempTheme(theme);
  }, [theme]);

  function ResetTimetable() {
    localStorage.removeItem("timetable");
    toast.success("Timetable has been reset.");
  }

  function ResetPlanner() {
    localStorage.removeItem("planner");
    toast.success("Planner has been reset.");
  }

  return (
    <div
      className="mx-auto max-w-md space-y-4"
      style={{
        padding: PADDING,
      }}
    >
      <h2 className="text-xl font-bold">Settings</h2>
      <section className="space-y-3 rounded-lg border p-4 shadow">
        <h2 className="text-lg font-semibold">Dark Mode</h2>
        <ToggleGroup
          type="single"
          className="w-fit flex-wrap"
          onValueChange={(value) => {
            changeTheme(value);
          }}
          value={tempTheme}
        >
          <ToggleGroupItem value="light" variant={"primary"}>
            <Sun className="mr-2" />
            Off
          </ToggleGroupItem>
          <ToggleGroupItem value="dark" variant={"primary"}>
            <Moon className="mr-2" />
            On
          </ToggleGroupItem>
          <ToggleGroupItem value="system" variant={"primary"}>
            <Monitor className="mr-2" />
            System
          </ToggleGroupItem>
        </ToggleGroup>
      </section>
      <section className="space-y-3 rounded-lg border p-4 shadow">
        <h2 className="text-lg font-semibold">Rooms</h2>
        <ToggleGroup
          type="single"
          className="w-fit"
          onValueChange={(value) => {
            changeRoomTheme(value as RoomKey);
          }}
          value={roomTheme}
        >
          {Object.keys(Rooms).map((roomkey, index) => (
            <ToggleGroupItem value={roomkey} variant={"primary"} key={index}>
              {Rooms[roomkey as RoomKey].name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </section>
      <section className="space-y-3 rounded-lg border p-4 shadow">
        <h2 className="text-lg font-semibold">Theme</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(TIMETABLE_THEMES).map(([themeName, theme], index) => (
            <div
              key={index}
              className={cn(
                "w-full rounded-lg border p-2 shadow-sm hover:border-foreground/30 md:w-fit",
                themeName == timetableTheme
                  ? "border-primary"
                  : "border-foreground/10",
              )}
              onClick={() =>
                changeTimetableTheme(themeName as TimetableThemeName)
              }
            >
              <div className="flex flex-col">
                <p className="text-center">
                  {themeName
                    .replace(/_/g, " ")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </p>
                <div className="flex justify-center">
                  {theme.map((color, index) => (
                    <div
                      key={index}
                      className="size-4"
                      style={{
                        backgroundColor: color.backgroundColor,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-3 rounded-lg border p-4 shadow">
        <h2 className="text-lg font-semibold">Matriculation Year</h2>
        <div className="flex flex-wrap justify-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button onClick={() => changeMatriculationYear}>
                <Calendar className="mr-2" />
                {matriculationYear ?? "Select Year"}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {matriculationYears.map((year) => (
                <DropdownMenuItem
                  key={year}
                  onClick={() => changeMatriculationYear(year as AcademicYear)}
                  className="justify-center"
                >
                  AY{year}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
      <section className="space-y-3 rounded-lg border p-4 shadow">
        <h3 className="text-lg font-semibold">iSync</h3>
        <p>
          Synchronize your timetable and module planning data between your
          devices.
        </p>
        <GenerateQRCode />
      </section>
      <section className="space-y-3 rounded-lg border p-4 shadow">
        <h3 className="text-lg font-semibold">Get Latest Module List</h3>
        <p>
          Get the latest module list from the server. This is to ensure that you
          have the latest modules and their information.
        </p>
        <div className="flex justify-center">
          <Button onClick={async () => await refreshAll()}>
            <RefreshCw className="mr-2" />
            Update
          </Button>
        </div>
      </section>
      <section className="space-y-3 rounded-lg border p-4 shadow">
        <h3 className="text-lg font-semibold">Reset Application</h3>
        <p>
          If you are facing issues with the application, you can reset the data
          stored in the application. This will remove all your Planner and
          Timetable data.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={ResetTimetable} variant={"destructive"}>
            <RotateCcw className="mr-2" />
            Reset Timetable
          </Button>
          <Button onClick={ResetPlanner} variant={"destructive"}>
            <RotateCcw className="mr-2" />
            Reset Planner
          </Button>
        </div>
      </section>
    </div>
  );
}
