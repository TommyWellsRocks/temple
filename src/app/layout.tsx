import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { SessionProvider } from "next-auth/react";
import { auth } from "~/server/auth";
import { ThemeProvider } from "~/lib/theme-provider";
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
  const session = await auth();
  return (
    <html lang="en" className={`${GeistSans.variable} m-3`}>
      <body className="flex flex-col gap-y-4 text-left text-xl font-medium">
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
