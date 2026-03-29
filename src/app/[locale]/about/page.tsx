import {Metadata, NextPage} from "next";
import Client from "@/app/[locale]/about/client";
import {SUPPORTED_LOCALES} from "@/locale/SupportedLocales/_index";

type Props = {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {locale} = await params;

    const lang = locale as keyof typeof SUPPORTED_LOCALES;

    const titleMap: Record<keyof typeof SUPPORTED_LOCALES, string> = {
        en: "About Scriptium | Theological & Philosophical Sources",
        tr: "Scriptium Hakkında | Teolojik ve Felsefi Kaynaklar",
    };

    const descriptionMap: Record<string, string> = {
        en: "Learn about Scriptium, a platform dedicated to collecting and presenting theological and philosophical sources with modern technology.",
        tr: "Teolojik ve felsefi kaynakları modern teknolojiyle toplama ve sunmaya adanmış bir platform olan Scriptium hakkında bilgi edinin.",
    };

    const title = titleMap[lang] || titleMap["en"];
    const description = descriptionMap[locale] || descriptionMap["en"];

    return {
        title,
        description,
    };
}

const Page: NextPage = () => {
    return <Client/>;
}

export default Page;