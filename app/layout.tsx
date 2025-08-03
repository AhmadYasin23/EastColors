import type React from "react";
import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import { LanguageWrapper } from "@/components/language-wrapper";

const inter = Inter({ subsets: ["latin"] });
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "East Colors - ألوان الشرق",
  description: "Leading design and advertising company in Jordan",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico?v=3",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.className} ${tajawal.variable}`}>
        <LanguageProvider>
          <LanguageWrapper>{children}</LanguageWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
