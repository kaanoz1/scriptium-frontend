import "../globals.css";
import type { Metadata } from "next";
import React from "react";
import Providers from "./providers";
import { EnvGuard } from "@/util/EnvGuard";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const SITE_URL = "https://scriptium.net";
const SITE_NAME = "Scriptium";
const SITE_DESCRIPTION =
  "Theology Library - Scriptium is a dedicated platform built to collect, structure, and present the world's most profound theological and philosophical sources in a modern, accessible format.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "theology",
    "religion",
    "philosophy",
    "Quran",
    "scripture",
    "religious texts",
    "Islam",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/icon/scriptium-light-theme-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon/scriptium-dark-theme-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon/scriptium-light-theme-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icon/scriptium-dark-theme-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon/scriptium-light-theme-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // TODO: This will be changed. For now, only English is supported

  if (!locale || !["en"].includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn(
        "h-full antialiased",
        "font-sans",
        geist.variable,
        "m-0 p-0",
      )}
      suppressHydrationWarning={EnvGuard.isDevelopment}
    >
      <body
        className="h-full m-0 p-0"
        suppressHydrationWarning={EnvGuard.isDevelopment}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
