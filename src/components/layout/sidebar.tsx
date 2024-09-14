"use client";

import { HomeIcon, LifeBuoy } from "lucide-react";

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

const data: SidebarData = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
      isCollapsible: false,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "mailto:admin@osiris.sg",
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
