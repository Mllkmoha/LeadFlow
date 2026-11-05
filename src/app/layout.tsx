import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const isVercel = process.env.VERCEL === "1";

export const metadata: Metadata = {
  title: "LeadFlow",
  description: "Customer relationship management, simplified.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          {children}
          {isVercel && (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}
