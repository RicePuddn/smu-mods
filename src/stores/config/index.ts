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
