"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { env } from "@/env";
import { useConfigStore } from "@/stores/config/provider";
import { useModuleBankStore } from "@/stores/moduleBank/provider";

import { Button } from "../ui/button";

const APP_VERSION = env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;

const TURN_ON_REFRESH = false;

export function Banners() {
  const {
    banners,
    dismissBanner,
    refreshBanners,
    appVersion,
    changeAppVersion,
  } = useConfigStore((state) => state);
  const { refreshAll } = useModuleBankStore((state) => state);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (appVersion !== null) {
      console.log("Version:", appVersion);
      if (
        appVersion !== APP_VERSION ||
        (appVersion == "development" && TURN_ON_REFRESH)
      ) {
        console.log("New version detected, refreshing data...");
        if (appVersion != "development") {
          refreshAll();
        }
        refreshBanners();
        changeAppVersion(APP_VERSION);
      }
    }
  }, [appVersion]);

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Rotate banners every 3 seconds, unless the user is hovering or focusing
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentBannerIndex(
          (prevIndex) =>
            (prevIndex + 1) %
            banners.filter((banner) => !banner.dismissed).length,
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, banners]);

  // Function to dismiss a banner
  const HandleDismissBanner = (id?: string) => {
    const index = banners.findIndex((banner) => banner.id === id);
    if (!banners[index]) return;
    banners[index].dismissed = true; // Update your state to dismiss the banner
    setCurrentBannerIndex(0); // Reset to the first available banner after dismissal
    dismissBanner(index);
  };

  const activeBanners = banners.filter((banner) => !banner.dismissed);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {activeBanners.length > 0 && (
        <div
          className="mb-2 flex items-center justify-start rounded-lg border-2 bg-background p-2 shadow-md"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          <div className="flex w-full items-center justify-between">
            <div>{activeBanners[currentBannerIndex]?.message}</div>
            <Button
              onClick={() =>
                HandleDismissBanner(activeBanners[currentBannerIndex]?.id)
              }
              size={"icon"}
              variant={"ghost"}
              className="size-6 rounded-full"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
