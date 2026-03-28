import {Metadata} from "next";
import {notFound} from "next/navigation";
import Main from "@/app/[locale]/test/main";
import {BackendApi} from "@/tool/Fetchers/BackendApi";
import {EnvGuard} from "@/util/EnvGuard";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
    title: "API Test | Verse",
    robots: {index: false, follow: false},
};

export default async function Page() {
    if (!EnvGuard.isDevelopment) notFound();

    const data = await BackendApi.VerseController.get(1, 1);

    return <React.Fragment>
        <Main initialResponse={data}/>
    </React.Fragment>;
}