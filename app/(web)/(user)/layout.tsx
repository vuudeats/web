
import "./../../globals.css";
import { SfProDisplay } from "sf-pro/display";
import { ReactNode } from "react";
import NavigationWeb from "@/components/navigation/web/navigation-web";

export default function RootLayout({
  children
}: {
  children: ReactNode;

}) {
  return (
    <html>
      <body
        className={`${SfProDisplay.className} antialiased`}
      >
        <NavigationWeb/>
        <div className="px-20 pt-24">
          {children}
        </div>
      </body>
    </html>
  );
}
