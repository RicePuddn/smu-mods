import { ModuleBankStoreProvider } from "@/stores/moduleBank/provider";
import { TRPCReactProvider } from "@/trpc/react";
import { HydrateClient } from "@/trpc/server";

export default function MainProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TRPCReactProvider>
      <HydrateClient>
        <ModuleBankStoreProvider>{children}</ModuleBankStoreProvider>
      </HydrateClient>
    </TRPCReactProvider>
  );
}
