"use client";

import { useEffect, useState } from "react";
import SHA256 from "crypto-js/sha256";
import { Loader2, QrCode } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

import { useConfigStore } from "@/stores/config/provider";
import { usePlannerStore } from "@/stores/planner/provider";
import { useTimetableStore } from "@/stores/timetable/provider";
import { api } from "@/trpc/react";
import { getBaseUrl } from "@/utils/getBaseUrl";

import { Button } from "../ui/button";

export function GenerateQRCode() {
  const { mutateAsync: getToken, isPending } = api.iSync.getToken.useMutation();
  const { timetableMap } = useTimetableStore((state) => state);
  const { planner, plannerState } = usePlannerStore((state) => state);
  const {
    iSyncLatestRecord: latestRecord,
    timetableTheme,
    roomTheme,
    matriculationYear,
    changeISyncLatestRecord: changeLatestRecord,
  } = useConfigStore((state) => state);
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      changeLatestRecord(null);
    };
  }, []);

  const handleGenerateQRCode = async () => {
    const content = JSON.stringify({
      timetable: timetableMap,
      planner: planner,
      plannerState: plannerState,
      timetableTheme,
      roomTheme,
      matriculationYear,
    });

    const hash = SHA256(content).toString();
    let id = "";
    if (!latestRecord) {
      const res = await getToken({
        content,
      });
      id = res.token;
      changeLatestRecord({
        id,
        hash,
        dateTime: new Date().toISOString(),
      });
    } else {
      const dateTime = new Date(latestRecord.dateTime).getTime();
      const now = new Date().getTime();
      if (now - dateTime > 1000 * 60 * 10) {
        const res = await getToken({
          content,
        });
        id = res.token;
        changeLatestRecord({
          id,
          hash,
          dateTime: new Date().toISOString(),
        });
      } else {
        id = latestRecord.id;
      }
    }
    setData(id);
  };

  return (
    <div className="flex justify-center">
      {data ? (
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <QRCodeCanvas
            value={`${getBaseUrl(true)}/iSync/${data}`}
            className="w-3/4"
            size={200}
          />
          <p className="text-destructive">
            This QR Code is valid for next 10 minutes.
          </p>
        </div>
      ) : (
        <Button onClick={handleGenerateQRCode} disabled={isPending}>
          {isPending ? (
            <Loader2 className="mr-2 animate-spin" />
          ) : (
            <QrCode className="mr-2" />
          )}
          Generate
        </Button>
      )}
    </div>
  );
}
