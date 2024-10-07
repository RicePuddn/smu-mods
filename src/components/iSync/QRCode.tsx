"use client";

import { usePlannerStore } from "@/stores/planner/provider";
import { useTimetableStore } from "@/stores/timetable/provider";
import { api } from "@/trpc/react";

export function GenerateQRCode() {
  const { mutateAsync: getToken } = api.iSync.getToken.useMutation();
  const { timetableMap } = useTimetableStore((state) => state);
  const { planner, plannerState } = usePlannerStore((state) => state);

  const handleGenerateQRCode = async () => {
    const res = await getToken({
      content: JSON.stringify({
        timetable: timetableMap,
        planner: planner,
        plannerState: plannerState,
      }),
    });
  };
  return <div>QRCode</div>;
}
