import { ArinRoom } from "./arin";
import { DefaultRoom } from "./default";

export type Room = {
  room: JSX.Element;
  name: string;
};

export const roomKeys = ["arin", "default"] as const;
export type RoomKey = (typeof roomKeys)[number];

export const Rooms: Record<RoomKey, Room> = {
  arin: { room: <ArinRoom />, name: "Arin's" },
  default: { room: <DefaultRoom />, name: "Default" },
};
