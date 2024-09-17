import StoreProviders from "@/stores/StoreProviders";
import { TRPCReactProvider } from "@/trpc/react";
import { HydrateClient } from "@/trpc/server";

export default function MainProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TRPCReactProvider>
      <HydrateClient>
        <StoreProviders>{children}</StoreProviders>
      </HydrateClient>
    </TRPCReactProvider>
  );
}
