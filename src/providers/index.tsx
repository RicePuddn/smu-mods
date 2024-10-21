import StoreProviders from "@/stores/StoreProviders";
import { TRPCReactProvider } from "@/trpc/react";
import { HydrateClient } from "@/trpc/server";
import { ThemeProvider } from "./themeProvider";

export default function MainProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TRPCReactProvider>
      <HydrateClient>
        <StoreProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="theme"
            themes={["light", "dark", "system"]}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </StoreProviders>
      </HydrateClient>
    </TRPCReactProvider>
  );
}
