import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { RoomKey } from "@/components/threed/rooms";
import { APP_CONFIG } from "@/config";
import { Year } from "@/types/planner";
import { TimetableThemeName } from "@/utils/timetable/colours";

const academicYear = APP_CONFIG.academicYear;

export type ISyncRecord = {
  id: string;
  hash: string;
  dateTime: string;
};

export type ConfigAction = {
  changeISyncLatestRecord: (newRecord: ISyncRecord) => void;
  changeTimetableTheme: (newTheme: TimetableThemeName) => void;
  changeRoomTheme: (newTheme: RoomKey) => void;
  changeUserYear: (matriculationYear: number) => void;
};

export type ConfigStore = {
  iSyncLatestRecord: ISyncRecord | null;
  timetableTheme: TimetableThemeName;
  roomTheme: RoomKey;
  userYear: Year;
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
        userYear: "2",
        changeISyncLatestRecord: (newRecord) => {
          set({ iSyncLatestRecord: newRecord });
        },
        changeTimetableTheme: (newTheme: TimetableThemeName) => {
          set({ timetableTheme: newTheme });
        },
        changeRoomTheme: (newTheme: RoomKey) => {
          set({ roomTheme: newTheme });
        },
        changeUserYear: (matriculationYear:number) => {
          const [startYear, endYear] = academicYear.split('/').map(Number);
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; // because JavaScript sets 0 as the first month
          const currentYear = currentDate.getFullYear();

          let userYear = currentYear - matriculationYear + 1;

          if (currentYear == endYear && currentMonth <= 4) {
            userYear -= 1;
          }

          if (userYear >= 1 && userYear <= 4) {
            set({userYear: userYear.toString() as Year})
          } else {
            console.warn("Invalid user year");
          }
        }
      }),
      {
        name: "config",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
