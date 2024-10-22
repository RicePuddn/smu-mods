"use client";

import { Monitor, Moon, RefreshCw, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { GenerateQRCode } from "@/components/iSync/QRCode";
import { RoomKey, Rooms } from "@/components/threed/rooms";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PADDING } from "@/config";
import { useConfigStore } from "@/stores/config/provider";
import { useModuleBankStore } from "@/stores/moduleBank/provider";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { roomTheme, changeRoomTheme } = useConfigStore((state) => state);
  const { refreshAll } = useModuleBankStore((state) => state);
  return (
    <div
      className="mx-auto max-w-md space-y-4"
      style={{
        padding: PADDING,
      }}
    >
      <h2 className="text-xl font-bold">Settings</h2>
      <section className="space-y-3 rounded-lg border p-4 shadow">
        <h2 className="text-lg font-semibold">Theme</h2>
        <ToggleGroup
          type="single"
          className="w-fit"
          onValueChange={(value) => {
            setTheme(value);
          }}
          value={theme}
        >
          <ToggleGroupItem value="light" variant={"outline"}>
            <Sun className="mr-2" />
            Light
          </ToggleGroupItem>
          <ToggleGroupItem value="dark" variant={"outline"}>
            <Moon className="mr-2" />
            Dark
          </ToggleGroupItem>
          <ToggleGroupItem value="system" variant={"outline"}>
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
            <ToggleGroupItem value={roomkey} variant={"outline"} key={index}>
              {Rooms[roomkey as RoomKey].name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
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
    </div>
  );
}
