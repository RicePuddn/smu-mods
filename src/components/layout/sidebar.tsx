"use client";

import {
  BookA,
  Calendar,
  HomeIcon,
  ImagePlay,
  LifeBuoy,
  NotebookPen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar";

import { type Links, type MainLink, NavMain } from "./nav-main";
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
      url: "/timetable",
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
      title: "Stress Relief",
      url: "/stress-relief",
      icon: ImagePlay,
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
