import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naše nebe",
  description: "Pro Lucinku ♥",
  robots: { index: false, follow: false }, // vyhledávače stránku neindexují
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FCF8F5" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;1,400&family=Poppins:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* Rozšíření prohlížeče (Grammarly a spol.) si do <body> přidávají vlastní
          atributy dřív, než se React naváže – bez tohohle to hlásí jako nesoulad. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
