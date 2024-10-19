"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";

import { createISyncBank, type ISyncStore } from "@/stores/iSync";

export type ISyncStoreApi = ReturnType<typeof createISyncBank>;

export interface ISyncStoreProviderProps {
  children: ReactNode;
}

const ISyncStoreContext = createContext<ISyncStoreApi | undefined>(undefined);

export const ISyncStoreProvider = ({ children }: ISyncStoreProviderProps) => {
  const storeRef = useRef<ISyncStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createISyncBank();
  }

  return (
    <ISyncStoreContext.Provider value={storeRef.current}>
      {children}
    </ISyncStoreContext.Provider>
  );
};

export const useISyncStore = <T,>(selector: (store: ISyncStore) => T): T => {
  const iSyncStoreContext = useContext(ISyncStoreContext);

  if (!iSyncStoreContext) {
    throw new Error(`useISyncStore must be used within ISyncStoreProvider`);
  }

  return useStore(iSyncStoreContext, selector);
};
