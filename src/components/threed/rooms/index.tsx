import { ArinRoom } from "./arin";
import { DefaultRoom } from "./default";
import { Ernest_room } from "./Ernest_room";
import { FT_room } from "./Ft_room";
import { Isaiah_room } from "./Isaiah_room";

export type Room = {
  room: JSX.Element;
  name: string;
  description: string;
};

export const roomKeys = [
  "arin",
  "johnny",
  "ernest",
  "isaiah",
  "fp",
  "ft",
] as const;
export type RoomKey = (typeof roomKeys)[number];

export const Rooms: Record<RoomKey, Room> = {
  arin: {
    room: <ArinRoom />,
    name: "Arin's Awesome Alcove",
    description: "Quiet corner for deep thoughts.",
  },
  johnny: {
    room: <DefaultRoom />,
    name: "Johnny's Default Room",
    description: "Code, debug, and innovate here.",
  },
  ernest: {
    room: <Ernest_room />,
    name: "Ernest's Hut",
    description: "Chill zone for inspired minds.",
  },
  isaiah: {
    room: <Isaiah_room />,
    name: "Izzy's Code Cave",
    description: "Where 2am debugging goes crazy.",
  },
  fp: {
    room: <DefaultRoom />,
    name: "Paulus' Hideout",
    description: "Plotting wolrd domination here (Do not disturb).",
  },
  ft: {
    room: <FT_room />,
    name: "FT's Little Lair",
    description: "Intersection of eunoia and tranquility.",
  },
};
