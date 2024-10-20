import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ISyncRecord = {
  id: string;
  hash: string;
  dateTime: string;
};

export type ISyncAction = {
  changeLatestRecord: (newRecord: ISyncRecord) => void;
};

export type ISyncStore = {
  latestRecord: ISyncRecord | null;
} & ISyncAction;

export const createISyncBank = (
  defaultLastRecord: ISyncRecord | null = null,
) => {
  return create<ISyncStore>()(
    persist(
      (set) => ({
        latestRecord: defaultLastRecord,
        changeLatestRecord: (newRecord) => {
          set({ latestRecord: newRecord });
        },
      }),

      {
        name: "planner",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
