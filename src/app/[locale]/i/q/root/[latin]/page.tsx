import {Metadata, NextPage} from "next";
import {SUPPORTED_LOCALES} from "@/locale/SupportedLocales/_index";
import {BackendApi} from "@/tool/Fetchers/BackendApi";
import {ResponseCodes} from "@/util/types/ResponseCodes";
import Client from "@/app/[locale]/i/q/root/[latin]/client";
import {ServerUtils} from "@/util/ServerUtils";
import NotFoundError from "@/util/components/Error/NotFoundError";
import RateLimitError from "@/util/components/Error/RateLimitError";
import ServerError from "@/util/components/Error/ServerError";
import UnknownError from "@/util/components/Error/UnknownError";

type Props = {
    params: Promise<{ latin: string; locale: string }>;
};

const Page: NextPage<Props> = async ({params}) => {
    const {locale, latin} = await params;


    const response = await BackendApi.RootController.get(latin);

    switch (response.status) {
        case ResponseCodes.OK:
            const currentUrl = `https://scriptium.com/${locale}/i/q/root`;
            await ServerUtils.General.Pages.upsertUrlToSitemap(currentUrl);

            return <Client root={response.data}/>;
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
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {locale, latin} = await params;

    // Dil anahtarı kontrolü (Opsiyonel ama güvenli bir yaklaşım)
    const currentLocale = (locale as keyof typeof SUPPORTED_LOCALES) || "en";

    const titleMap: Record<keyof typeof SUPPORTED_LOCALES, string> = {
        en: `Scriptium - Root: ${latin}`,
        tr: `Scriptium - Kök: ${latin}`,
    };

    const descriptionMap: Record<keyof typeof SUPPORTED_LOCALES, string> = {
        en: `Scriptium - Root: ${latin} - Origins and details.`,
        tr: `Scriptium - Kök: ${latin} - Kelime kökenleri ve detayları.`,
    };

    return {
        title: titleMap[currentLocale] || titleMap["en"],
        description: descriptionMap[currentLocale] || descriptionMap["en"],
    };
}


export default Page;