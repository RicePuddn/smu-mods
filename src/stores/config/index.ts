import { RoomKey } from "@/components/threed/rooms";
import { TimetableThemeName } from "@/utils/timetable/colours";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ISyncRecord = {
  id: string;
  hash: string;
  dateTime: string;
};

export type ConfigAction = {
  changeISyncLatestRecord: (newRecord: ISyncRecord) => void;
  changeRoomTheme: (newTheme: RoomKey) => void;
};

export type ConfigStore = {
  iSyncLatestRecord: ISyncRecord | null;
  timetableTheme: TimetableThemeName;
  roomTheme: RoomKey;
} & ConfigAction;

export const createConfigBank = (
  defaultLastRecord: ISyncRecord | null = null,
  defaultTimetableTheme: TimetableThemeName = "default",
) => {
  return create<ConfigStore>()(
    persist(
      (set) => ({
        iSyncLatestRecord: defaultLastRecord,
        timetableTheme: defaultTimetableTheme,
        roomTheme: "default",
        changeISyncLatestRecord: (newRecord) => {
          set({ iSyncLatestRecord: newRecord });
        },
        changeRoomTheme: (newTheme) => {
          set({ roomTheme: newTheme });
        },
      }),
      {
        name: "config",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
