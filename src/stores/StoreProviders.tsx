import { ModuleBankStoreProvider, useModuleStore } from "./moduleBank/provider";

export default function StoreProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModuleBankStoreProvider>{children}</ModuleBankStoreProvider>;
}

export { useModuleStore };
