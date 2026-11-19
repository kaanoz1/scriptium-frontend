import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnvGuard } from "@/util/EnvGuard";
import Client from "@/app/[locale]/test/errors/client";

export const metadata: Metadata = {
  title: "Error Gallery",
  robots: { index: false, follow: false },
};

/** Development-only gallery of every error state, rendered without triggering it. */
export default function Page() {
  if (!EnvGuard.isDevelopment) notFound();

  return <Client />;
}
