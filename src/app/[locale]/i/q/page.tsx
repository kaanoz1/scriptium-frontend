import {Metadata, NextPage} from "next";
import {BackendApi} from "@/tool/Fetchers/BackendApi";
import {ResponseCodes} from "@/util/types/ResponseCodes";
import UnknownError from "@/util/components/Error/UnknownError";
import ServerError from "@/util/components/Error/ServerError";
import RateLimitError from "@/util/components/Error/RateLimitError";
import NotFoundError from "@/util/components/Error/NotFoundError";
import Client from "@/app/[locale]/i/q/client";
import {ServerUtils} from "@/util/ServerUtils";

type Props = {
    params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
    title: "Scriptium - Qur'an Chapters",
    description: "All chapters from Qur'an"
}

const Page: NextPage<Props> = async ({params}) => {
    const {locale} = await params;

    const response = await BackendApi.ChapterController.list();

    switch (response.status) {
        case ResponseCodes.OK:
            const currentUrl = `https://scriptium.com/${locale}/i/q`;
            await ServerUtils.General.Pages.upsertUrlToSitemap(currentUrl);

            return <Client chapters={response.data}/>;
        case ResponseCodes.NOT_FOUND:
            return <NotFoundError/>;
        case ResponseCodes.TOO_MANY_REQUESTS:
            return <RateLimitError/>;
        case ResponseCodes.INTERNAL_SERVER_ERROR:
            return <ServerError/>;
        case ResponseCodes.UNKNOWN_ERROR:
        default:
            return <UnknownError/>;
    }
}

export default Page;