import type { Metadata } from "next";
// For now, using default next/google fonts, assuming Geist might not be available out of the box without 'geist' package.
// Using Inter as fallback or main choice if Geist isn't installed.
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Alex Sterling | Principal Product Designer",
  description: "Executive Portfolio",
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
