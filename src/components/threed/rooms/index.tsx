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
    name: "Johnny's JavaScript Junction",
    description: "Code, debug, and innovate here.",
  },
  ernest: {
    room: <Ernest_room />,
    name: "Ernest's Epic Escape",
    description: "Chill zone for inspired minds.",
  },
  isaiah: {
    room: <Isaiah_room />,
    name: "Isaiah's Idea Igloo",
    description: "Where creativity thrives and flows.",
  },
  fp: {
    room: <DefaultRoom />,
    name: "Felicia Paulus' Peaceful Pad",
    description: "Serene space for thoughtful relaxation.",
  },
  ft: {
    room: <FT_room />,
    name: "Felicia Tanujaya's Funhouse",
    description: "Exciting hangout for playful ideas.",
  },
};
