import {Metadata, NextPage} from "next";
import {BackendApi} from "@/tool/Fetchers/BackendApi";
import {ResponseCodes} from "@/util/types/ResponseCodes";
import UnknownError from "@/util/components/Error/UnknownError";
import ServerError from "@/util/components/Error/ServerError";
import RateLimitError from "@/util/components/Error/RateLimitError";
import NotFoundError from "@/util/components/Error/NotFoundError";
import Client from "@/app/[locale]/i/q/client";

export const metadata: Metadata = {
    title: "Scriptium - Qur'an Chapters",
    description: "All chapters from Qur'an"
}

const Page: NextPage = async () => {

    const response = await BackendApi.ChapterController.list();

    switch (response.status) {
        case ResponseCodes.UNKNOWN_ERROR:
            return <UnknownError/>
        case ResponseCodes.INTERNAL_SERVER_ERROR:
            return <ServerError/>
        case ResponseCodes.TOO_MANY_REQUESTS:
            return <RateLimitError/>;
        case ResponseCodes.NOT_FOUND:
            return <NotFoundError/>;
    }

    if (response.status == ResponseCodes.OK)
        return <Client chapters={response.data}/>

    return <UnknownError/>
}

export default Page;