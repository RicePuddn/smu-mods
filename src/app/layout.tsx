import "@/styles/globals.css";

import { type Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import MainProviders from "@/providers";

export const metadata: Metadata = {
  title: "SMU MODs",
  description: "Plan your SMU modules with ease",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body>
        <MainProviders>{children}</MainProviders>
      </body>
    </html>
  );
}
