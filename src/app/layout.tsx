import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { SessionProvider } from "next-auth/react";
import { auth } from "~/server/auth";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata = {
  title: "Temple",
  description: "Your Temple. Built To Spec.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
