"use client";

import { useRouter } from "next/navigation";

import { SearchModule } from "@/components/SearchModule";
import { PADDING } from "@/config";

export default async function BidAnalyticsPage() {
  const router = useRouter();
  return (
    <div
      style={{
        padding: PADDING,
      }}
      className="space-y-4"
    >
      <h1 className="text-2xl font-bold">Search Bid Price Analytics</h1>
      <SearchModule
        handleModSelect={(mod) => {
          router.push(`/bid-analytics/${mod.moduleCode}`);
        }}
      />
    </div>
  );
}
