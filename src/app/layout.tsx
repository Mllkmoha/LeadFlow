import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/providers";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: "variable",
  axes: ["opsz"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: "variable",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  display: "swap",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <Providers nonce={nonce}>
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
