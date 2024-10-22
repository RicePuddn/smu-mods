import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { RoomKey } from "@/components/threed/rooms";
import type { AcademicYear } from "@/config";
import type { TimetableThemeName } from "@/utils/timetable/colours";
import { roomKeys } from "@/components/threed/rooms";
import { APP_CONFIG } from "@/config";

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
  changeMatriculationYear: (matriculationYear: AcademicYear) => void;
  iSync: (
    timetableTheme: TimetableThemeName,
    roomTheme: RoomKey,
    matriculationYear: AcademicYear,
  ) => void;
};

export type ConfigStore = {
  iSyncLatestRecord: ISyncRecord | null;
  timetableTheme: TimetableThemeName;
  roomTheme: RoomKey;
  matriculationYear: AcademicYear;
} & ConfigAction;

export const createConfigBank = (
  defaultLastRecord: ISyncRecord | null = null,
  defaultTimetableTheme: TimetableThemeName = "default",
  defaultAcademicYear: AcademicYear = academicYear,
  defaultRoomTheme: RoomKey = roomKeys[0],
) => {
  return create<ConfigStore>()(
    persist(
      (set) => ({
        iSyncLatestRecord: defaultLastRecord,
        timetableTheme: defaultTimetableTheme,
        roomTheme: defaultRoomTheme,
        matriculationYear: defaultAcademicYear,
        changeISyncLatestRecord: (newRecord) => {
          set({ iSyncLatestRecord: newRecord });
        },
        changeTimetableTheme: (newTheme) => {
          set({ timetableTheme: newTheme });
        },
        changeRoomTheme: (newTheme) => {
          set({ roomTheme: newTheme });
        },
        changeMatriculationYear: (newMatriculationYear) => {
          set({ matriculationYear: newMatriculationYear });
          // const [startYear, endYear] = academicYear.split('/').map(Number);
          // const realMatriculationYear = Number(newMatriculationYear.split('/')[0]);
          // const currentDate = new Date();
          // const currentMonth = currentDate.getMonth() + 1; // because JavaScript sets 0 as the first month
          // const currentYear = currentDate.getFullYear();

          // let userYear = currentYear - realMatriculationYear + 1;

          // if (currentYear == endYear && currentMonth <= 4) {
          //   userYear -= 1;
          // }

          // if (userYear >= 1 && userYear <= 4) {
          //   set({realMatriculationYear: userYear})
          // } else {
          //   console.warn("Invalid user year");
          // }
        },
        iSync: (timetableTheme, roomTheme, matriculationYear) => {
          set({
            timetableTheme,
            roomTheme,
            matriculationYear,
          });
        },
      }),
      {
        name: "config",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
