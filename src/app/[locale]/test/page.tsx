import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import { EnvGuard } from "@/util/EnvGuard";
import React from "react";
import Main from "./main";

export const metadata: Metadata = {
  title: "API Test | Verse",
  robots: { index: false, follow: false },
};

export default async function Page() {
  if (!EnvGuard.isDevelopment) notFound();

  const data = await BackendApi.RootController.listAdvanced();

  return (
    <React.Fragment>
      <Main initialResponse={data} />
    </React.Fragment>
  );
}
