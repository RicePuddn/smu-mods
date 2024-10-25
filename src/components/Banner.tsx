import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Banner() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !resolvedTheme) {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 z-50 w-full p-4">
      {resolvedTheme === "light" ? (
        <div className="relative flex h-24 w-full items-center justify-between rounded-lg bg-gradient-to-r from-white to-gray-300 px-6 shadow-lg">
          <Image src="/logo_light.png" width="200" height="100" alt="logo" />
          <p className="text-right text-sm font-semibold text-gray-600 md:text-lg">
            Your Ultimate Module Planning Tool
          </p>
        </div>
      ) : (
        <div className="relative flex h-24 w-full items-center justify-between rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 px-6 shadow-lg">
          <Image src="/logo_dark.png" width="200" height="100" alt="logo" />
          <p className="text-right text-sm font-semibold text-white md:text-lg">
            Your Ultimate Module Planning Tool
          </p>
        </div>
      )}
    </div>
  );
}
