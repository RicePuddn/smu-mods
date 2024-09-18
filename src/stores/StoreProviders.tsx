import { ModuleBankStoreProvider } from "./moduleBank/provider";
import { TimetableStoreProvider } from "./timetable/provider";

export default function StoreProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModuleBankStoreProvider>
      <TimetableStoreProvider>{children}</TimetableStoreProvider>
    </ModuleBankStoreProvider>
  );
}
