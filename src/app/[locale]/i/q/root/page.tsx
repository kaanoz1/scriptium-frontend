import {Metadata, NextPage} from "next";
import {SUPPORTED_LOCALES} from "@/locale/SupportedLocales/_index";
import {BackendApi} from "@/tool/Fetchers/BackendApi";
import {ResponseCodes} from "@/util/types/ResponseCodes";
import {ServerUtils} from "@/util/ServerUtils";
import Client from "@/app/[locale]/i/q/root/client";
import NotFoundError from "@/util/components/Error/NotFoundError";
import RateLimitError from "@/util/components/Error/RateLimitError";
import ServerError from "@/util/components/Error/ServerError";
import UnknownError from "@/util/components/Error/UnknownError";


type Props = {
    params: Promise<{ locale: string }>;
};

const Page: NextPage<Props> = async ({params}) => {

    const {locale} = await params;


    const response = await BackendApi.RootController.listAdvanced();

    switch (response.status) {
        case ResponseCodes.OK:
            const currentUrl = `https://scriptium.com/${locale}/i/q/root`;
            await ServerUtils.General.Pages.upsertUrlToSitemap(currentUrl);

            return <Client roots={response.data}/>;
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

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {locale} = await params;

    const lang = locale as keyof typeof SUPPORTED_LOCALES;

    const title: Record<keyof typeof SUPPORTED_LOCALES, string> = {
        "en": "Roots of Quran",
        "tr": "Kök"
    }

    const descriptions: Record<keyof typeof SUPPORTED_LOCALES, string> = {
        "en": "Explore the linguistic roots and deep etymology of the Quran with Scriptium. Analyze word origins and patterns to enhance your understanding.",
        "tr": "Scriptium ile Kur'an'ın dilbilimsel köklerini ve derin etimolojisini keşfedin. Kelime kökenlerini ve kalıplarını analiz ederek anlayışınızı derinleştirin."
    };

    const label = title[lang] || title.en;

    return {
        title: `Scriptium - ${label}`,
        description: descriptions[lang] || descriptions.en
    };
}
