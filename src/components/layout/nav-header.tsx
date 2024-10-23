"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config";
import { termMap } from "@/types/planner";

export default function NavHeader() {
  const { theme } = useTheme();
  return (
    <div className="sticky top-0 z-50 flex items-center justify-start gap-2 border-b-2 border-dashed bg-background p-2">
      <SidebarTrigger />
      <div className="relative h-10 w-32">
        <Image
          src={"/logo_light.png"}
          fill
          alt="Logo"
          className="block object-contain dark:hidden"
          sizes="100%"
          priority
        />
        <Image
          src={"/logo_dark.png"}
          fill
          alt="Logo"
          className="hidden object-contain dark:block"
          sizes="100%"
          priority
        />
      </div>
      <p className="ml-auto mr-2 text-sm">
        AY{APP_CONFIG.academicYear}, {termMap[APP_CONFIG.currentTerm]}
      </p>
    </div>
  );
}
