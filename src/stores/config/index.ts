import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { RoomKey } from "@/components/threed/rooms";
import { TimetableThemeName } from "@/utils/timetable/colours";

export type ISyncRecord = {
  id: string;
  hash: string;
  dateTime: string;
};

export type ConfigAction = {
  changeISyncLatestRecord: (newRecord: ISyncRecord) => void;
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
        changeTheme: (newTheme: TimetableThemeName) => {
          set({ timetableTheme: newTheme });
        },
        changeRoomTheme: (newTheme: RoomKey) => {
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
