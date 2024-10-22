"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { APP_CONFIG } from "@/config";
import { usePlannerStore } from "@/stores/planner/provider";
import { useTimetableStore } from "@/stores/timetable/provider";
import { api } from "@/trpc/react";

export default function Page({ params }: { params: { token: string } }) {
  const { mutateAsync: getToken } = api.iSync.getContent.useMutation();
  const { mutateAsync: deleteToken } = api.iSync.deleteToken.useMutation();
  const { iSync: iSyncTimeTable } = useTimetableStore((state) => state);
  const { iSync: iSyncPlanner } = usePlannerStore((state) => state);

  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      const { content } = await getToken({ token: params.token });
      const data = JSON.parse(content);
      try {
        iSyncTimeTable(data.timetable);
        iSyncPlanner(data.plannerState, data.planner);
        await deleteToken({ token: params.token });
      } catch (e) {
        console.error(e);
      }
      router.push(`/timetable/${APP_CONFIG.currentTerm}`);
    };

    fetchContent();
  }, []);

  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      Loading...
    </div>
  );
}
