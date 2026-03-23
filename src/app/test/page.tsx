import {Metadata} from "next";
import {notFound} from "next/navigation";
import Main from "@/app/test/main";
import {BackendApi} from "@/tool/Fetchers/BackendApi";
import {EnvGuard} from "@/util/EnvGuard";

export const metadata: Metadata = {
    title: "Test Page | Scriptium",
    description: "Internal testing page for API responses and model transformations.",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function Page() {
    if (EnvGuard.isProduction)
        notFound();


    const data = await BackendApi.ChapterController.list();

    return <Main initialResponse={data}/>;
}