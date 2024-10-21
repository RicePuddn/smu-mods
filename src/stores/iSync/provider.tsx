"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";

import { createConfigBank, type ConfigStore } from "@/stores/iSync";

export type ConfigStoreApi = ReturnType<typeof createConfigBank>;

export interface ConfigStoreProviderProps {
  children: ReactNode;
}

const ConfigStoreContext = createContext<ConfigStoreApi | undefined>(undefined);

export const ConfigStoreProvider = ({ children }: ConfigStoreProviderProps) => {
  const storeRef = useRef<ConfigStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createConfigBank();
  }

  return (
    <ConfigStoreContext.Provider value={storeRef.current}>
      {children}
    </ConfigStoreContext.Provider>
  );
};

export const useConfigStore = <T,>(selector: (store: ConfigStore) => T): T => {
  const configStoreContext = useContext(ConfigStoreContext);

  if (!configStoreContext) {
    throw new Error(`useConfigStore must be used within ConfigStoreProvider`);
  }

  return useStore(configStoreContext, selector);
};
