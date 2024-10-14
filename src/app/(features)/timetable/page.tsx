"use client";
import { useTimetableStore } from "@/stores/timetable/provider";

export default function TimeTablePage() {
  const { timetableMap } = useTimetableStore((state) => state);

  return (
    <div>
      <pre>{JSON.stringify(timetableMap, null, 2)}</pre>
    </div>
  );
}
