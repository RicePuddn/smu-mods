import Image from "next/image";
import lightModeLogo from './light-mode.png'
import { SidebarTrigger } from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config";
import { termMap } from "@/types/planner";

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
      
      <div className="relative h-12 w-12">
        <Image
          src={lightModeLogo}
          alt="Logo"
          width={500}
          height={500}
        />
      </div>
      {/* <h1 className="text-xl font-semibold">SMUMODS</h1> */}
      <p className="ml-auto mr-2 text-sm">
        AY{APP_CONFIG.academicYear}, {termMap[APP_CONFIG.currentTerm]}
      </p>
    </div>
  );
}
