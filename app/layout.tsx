"use client"
import "./globals.css";
import { SfProDisplay } from "sf-pro/display";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import NavigationWeb from "@/components/navigation/web/navigation-web";

export default function RootLayout({
  children,
  auth
}: {
  children: ReactNode;
  auth: ReactNode;
}) {
  return (
    <html>
      <body
        className={`${SfProDisplay.className} antialiased`}
      >
        <SessionProvider refetchOnWindowFocus={true} refetchInterval={5 * 60}>
          <NavigationWeb/>
          <div className="px-20 pt-24">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
