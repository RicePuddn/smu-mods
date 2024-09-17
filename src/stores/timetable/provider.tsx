"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import { type TimetableStore, createTimetableStore } from "@/stores/timetable";

export type TimetableStoreApi = ReturnType<typeof createTimetableStore>;

export interface TimetableStoreProviderProps {
  children: ReactNode;
}

const TimetableStoreContext = createContext<TimetableStoreApi | undefined>(
  undefined,
);

export const TimetableStoreProvider = ({
  children,
}: TimetableStoreProviderProps) => {
  const storeRef = useRef<TimetableStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createTimetableStore();
  }

  return (
    <TimetableStoreContext.Provider value={storeRef.current}>
      {children}
    </TimetableStoreContext.Provider>
  );
};

export const useTimetableStore = <T,>(
  selector: (store: TimetableStore) => T,
): T => {
  const timetableStoreContext = useContext(TimetableStoreContext);

  if (!timetableStoreContext) {
    throw new Error(
      `useCounterStore must be used within TimetableStoreProvider`,
    );
  }

  return useStore(timetableStoreContext, selector);
};