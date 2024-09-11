// import Image from "next/image";

import { SidebarTrigger } from "@/components/ui/sidebar";

export default function NavHeader() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-start gap-2 border-b-2 border-dashed bg-background p-2">
      <SidebarTrigger />
      {/* <div className="relative h-10 w-32">
        <Image
          src={"/favicon.ico"}
          fill
          alt="Logo"
          className="object-contain"
          sizes="100%"
          priority
        />
      </div> */}
      <h1 className="text-xl font-semibold">SMU-MODS</h1>
    </div>
  );
}
