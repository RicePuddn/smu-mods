"use client";

import { useISyncStore } from "@/stores/iSync/provider";
import { usePlannerStore } from "@/stores/planner/provider";
import { useTimetableStore } from "@/stores/timetable/provider";
import { api } from "@/trpc/react";
import { getBaseUrl } from "@/utils/getBaseUrl";
import SHA256 from "crypto-js/sha256";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import { Button } from "../ui/button";

export function GenerateQRCode() {
  const { mutateAsync: getToken } = api.iSync.getToken.useMutation();
  const { timetableMap } = useTimetableStore((state) => state);
  const { planner, plannerState } = usePlannerStore((state) => state);
  const { latestRecord, changeLatestRecord } = useISyncStore((state) => state);
  const [data, setData] = useState<string | null>(null);

  const handleGenerateQRCode = async () => {
    const content = JSON.stringify({
      timetable: timetableMap,
      planner: planner,
      plannerState: plannerState,
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
        <div className="flex w-full flex-col items-center justify-center">
          <QRCodeCanvas
            value={`${getBaseUrl(true)}/iSync/${data}`}
            className="w-3/4"
            size={360}
          />
          <p>This QR Code is valid for next 10 minutes.</p>
        </div>
      ) : (
        <Button onClick={handleGenerateQRCode}>Generate QR Code</Button>
      )}
    </div>
  );
}
