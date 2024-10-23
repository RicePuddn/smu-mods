"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

import { env } from "@/env";
import { useConfigStore } from "@/stores/config/provider";
import { useModuleBankStore } from "@/stores/moduleBank/provider";

import { Button } from "../ui/button";

const APP_VERSION = env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_ID;

export function Banners() {
  const {
    banners,
    dismissBanner,
    refreshBanners,
    appVersion,
    changeAppVersion,
  } = useConfigStore((state) => state);
  const { refreshAll } = useModuleBankStore((state) => state);

  useEffect(() => {
    if (appVersion !== APP_VERSION) {
      refreshBanners();
      refreshAll();
      changeAppVersion(APP_VERSION);
    }
  }, []);

  return (
    <>
      {banners.filter((banner) => !banner.dismissed).length > 0 && (
        <div className="mb-2 flex items-center justify-start rounded-lg border-2 bg-background p-2 shadow-md">
          {banners
            .filter((banner) => !banner.dismissed)
            .map((banner, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-between"
              >
                <div>{banner.message}</div>
                <Button
                  onClick={() => dismissBanner(index)}
                  size={"icon"}
                  variant={"ghost"}
                  className="size-6 rounded-full"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
