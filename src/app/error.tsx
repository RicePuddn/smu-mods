"use client";

// Error boundaries must be Client Components
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const pathname = usePathname();

  function handleReset() {
    localStorage.clear();
  }

  return (
    <div className="flex h-dvh w-dvw items-center justify-center text-center">
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <div>
          <p>An error occurred while rendering this page.</p>
          <p>
            This may have caused by breaking changes on the new update to the
            system.
          </p>
          <p>
            You can try to refresh the page or go to the settings page to reset
            the app.
          </p>
        </div>
        {pathname == "/settings" ? (
          <Button variant={"destructive"} onClick={handleReset}>
            Reset Application
          </Button>
        ) : (
          <Button asChild>
            <Link href="/settings">Go to Settings</Link>
          </Button>
        )}
        <div className="w-full">
          <p className="text-sm">Error details:</p>
          <div className="w-full overflow-x-scroll rounded-md bg-foreground/10 p-2">
            <code>{error.message}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
