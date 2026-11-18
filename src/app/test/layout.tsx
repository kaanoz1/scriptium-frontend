import "../globals.css";
import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { EnvGuard } from "@/util/EnvGuard";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Root layout for dev-only test routes (outside [locale], so no next-intl).
export default function TestLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!EnvGuard.isDevelopment) notFound();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-full m-0 p-0 antialiased">{children}</body>
    </html>
  );
}
