import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Temple",
  description: "Your Temple. Built To Spec.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} m-3 dark`}>
      <body className="flex flex-col gap-y-4 text-left text-xl font-medium">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
