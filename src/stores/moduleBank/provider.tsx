"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import { type ModuleBankStore, createModuleBank } from "@/stores/moduleBank";

export type ModuleBankStoreApi = ReturnType<typeof createModuleBank>;

export interface ModuleBankStoreProviderProps {
  children: ReactNode;
}

const ModuleBankStoreContext = createContext<ModuleBankStoreApi | undefined>(
  undefined,
);

export const ModuleBankStoreProvider = ({
  children,
}: ModuleBankStoreProviderProps) => {
  const storeRef = useRef<ModuleBankStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createModuleBank();
  }

  return (
    <ModuleBankStoreContext.Provider value={storeRef.current}>
      {children}
    </ModuleBankStoreContext.Provider>
  );
};

export const useCounterStore = <T,>(
  selector: (store: ModuleBankStore) => T,
): T => {
  const counterStoreContext = useContext(ModuleBankStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
