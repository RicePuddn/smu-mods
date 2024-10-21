"use client";

import { GenerateQRCode } from "@/components/iSync/QRCode";
import { RoomKey, Rooms } from "@/components/threed/rooms";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PADDING } from "@/config";
import { useConfigStore } from "@/stores/config/provider";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { roomTheme, changeRoomTheme } = useConfigStore((state) => state);
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
    </div>
  );
}
