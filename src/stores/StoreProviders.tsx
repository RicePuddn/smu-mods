import { ConfigStoreProvider } from "./iSync/provider";
import { ModuleBankStoreProvider } from "./moduleBank/provider";
import { PlannerStoreProvider } from "./planner/provider";
import { TimetableStoreProvider } from "./timetable/provider";

export default function StoreProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigStoreProvider>
      <ModuleBankStoreProvider>
        <TimetableStoreProvider>
          <PlannerStoreProvider>{children}</PlannerStoreProvider>
        </TimetableStoreProvider>
      </ModuleBankStoreProvider>
    </ConfigStoreProvider>
  );
}
