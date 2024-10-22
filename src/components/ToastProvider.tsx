"use client"

import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "next-themes";

export const ToastProvider = () => {
  const {theme} = useTheme()

    return <Toaster richColors theme={theme as "light" | "dark" | "system" | undefined} closeButton position="top-right" />
}