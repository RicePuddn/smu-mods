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
};

export type ConfigStore = {
  iSyncLatestRecord: ISyncRecord | null;
  timetableTheme: TimetableThemeName;
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
        changeISyncLatestRecord: (newRecord) => {
          set({ iSyncLatestRecord: newRecord });
        },
      }),
      {
        name: "config",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
