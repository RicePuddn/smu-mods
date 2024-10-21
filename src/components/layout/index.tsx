import { SidebarLayout } from "@/components/ui/sidebar";

import NavHeader from "./nav-header";
import { AppSidebar } from "./sidebar";

export interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const { cookies } = await import("next/headers");
  return (
    <SidebarLayout
      defaultOpen={cookies().get("sidebar:state")?.value === "true"}
    >
      <AppSidebar />
      <main className="flex h-[100dvh] max-h-[100dvh] max-w-full flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <div className="h-full max-h-full overflow-y-scroll rounded-md border-2 border-dashed">
          <NavHeader />
          <div>{children}</div>
        </div>
      </main>
    </SidebarLayout>
  );
}
