import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/UI/Providers";

export const metadata: Metadata = {
  title: "Scriptium",
  description: "Platform for research for sacred texts",
  icons: {
    apple: "/images/logo/scriptium-logo-1024xwhite.png",
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/logo/scriptium-dark-icon.png",
        href: "/images/logo/scriptium-dark-icon.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/logo/scriptium-light-icon.png",
        href: "/images/logo/scriptium-light-icon.png",
      },
    ],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Scriptium",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
