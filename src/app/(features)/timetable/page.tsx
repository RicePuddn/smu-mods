"use client";
import { useTimetableStore } from "@/stores/timetable/provider";

export default function TimeTablePage() {
  const { timetable } = useTimetableStore((state) => state);

  return (
    <div>
      <pre>{JSON.stringify(timetable, null, 2)}</pre>
    </div>
  );
}
