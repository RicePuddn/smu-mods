"use client";

import {
  BookA,
  Calendar,
  HandHeartIcon,
  HomeIcon,
  LifeBuoy,
  NotebookPen,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config";

import type { Links, MainLink } from "./nav-main";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";

export type SidebarProps = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};

export type SidebarData = {
  navMain: Links[];
  navSecondary: MainLink[];
};

// timetable
// planner
// courses
// stress relief
const data: SidebarData = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
      isCollapsible: false,
    },
    {
      title: "Timetable",
      url: `/timetable/${APP_CONFIG.currentTerm}`,
      icon: Calendar,
      isCollapsible: false,
    },
    {
      title: "Planner",
      url: "/planner",
      icon: NotebookPen,
      isCollapsible: false,
    },
    {
      title: "Modules",
      url: "/modules",
      icon: BookA,
      isCollapsible: false,
    },
    {
      title: "Beyond Studies",
      url: "/beyond-studies",
      icon: HandHeartIcon,
      isCollapsible: false,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      isCollapsible: false,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "mailto:knyanlin@johnnyknl.me",
      icon: LifeBuoy,
      isCollapsible: false,
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Platform</SidebarLabel>
          <NavMain items={data.navMain} />
        </SidebarItem>
        <SidebarItem className="mt-auto">
          <SidebarLabel>Help</SidebarLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarItem>
      </SidebarContent>
    </Sidebar>
  );
}
