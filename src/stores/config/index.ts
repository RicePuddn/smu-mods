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
  theme: "light" | "dark" | "system";
} & ConfigAction;

export const createConfigBank = (
  defaultLastRecord: ISyncRecord | null = null,
) => {
  return create<ConfigStore>()(
    persist(
      (set) => ({
        iSyncLatestRecord: defaultLastRecord,
        theme: "system",
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
