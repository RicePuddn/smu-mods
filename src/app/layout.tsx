import "@/styles/globals.css";

import Layout from "@/components/layout";
import MainProviders from "@/providers";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "SMU MODs",
  description: "Plan your SMU modules with ease",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <MainProviders>
          <Layout>{children}</Layout>
        </MainProviders>
      </body>
    </html>
  );
}
