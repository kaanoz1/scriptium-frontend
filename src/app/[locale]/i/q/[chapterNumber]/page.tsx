import {Metadata, NextPage} from "next";
import {cache} from "react";
import {ResponseCodes} from "@/util/types/ResponseCodes";
import {BackendApi} from "@/tool/Fetchers/BackendApi";
import {SUPPORTED_LOCALES} from "@/locale/SupportedLocales/_index";
import UnknownError from "@/util/components/Error/UnknownError";
import ServerError from "@/util/components/Error/ServerError";
import RateLimitError from "@/util/components/Error/RateLimitError";
import NotFoundError from "@/util/components/Error/NotFoundError";
import Client from "@/app/[locale]/i/q/[chapterNumber]/client";

import {ServerUtils} from "@/util/ServerUtils";
import {redirect} from "next/navigation";

type Props = {
    params: Promise<{ chapterNumber?: string; locale: string }>;
};

const getChapterData = cache(async (num: number) => {
    return await BackendApi.ChapterController.get(num);
});

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {chapterNumber, locale} = await params;
    const lang = locale as keyof typeof SUPPORTED_LOCALES;
    const parsedNumber = parseInt(chapterNumber || "0");


    const notFoundTitles: Record<keyof typeof SUPPORTED_LOCALES, string> = {
        en: "Chapter Not Found - Scriptium",
        tr: "Sure Bulunamadı - Scriptium"
    };

    const errorTitles: Record<keyof typeof SUPPORTED_LOCALES, string> = {
        en: "Error - Scriptium",
        tr: "Hata - Scriptium"
    };

    if (isNaN(parsedNumber) || parsedNumber <= 0 || parsedNumber > 114)
        return {title: notFoundTitles[lang] || notFoundTitles.en};


    const response = await getChapterData(parsedNumber);

    if (response.status !== ResponseCodes.OK || !response.data)
        return {title: errorTitles[lang] || errorTitles.en};


    const meaning = response.data.meanings.find(m => m.language.code === locale);
    const chapterLabel = meaning?.text || response.data.name;

    const descriptions: Record<keyof typeof SUPPORTED_LOCALES, string> = {
        en: `Read Surah ${response.data.name} (${chapterLabel}) with translations.`,
        tr: `${chapterLabel} suresini mealleri ile birlikte detaylı inceleyin.`
    };

    return {
        title: `Scriptium - ${chapterLabel}`,
        description: descriptions[lang] || descriptions.en
    };
}

const Page: NextPage<Props> = async ({params}) => {
    const {chapterNumber, locale} = await params;

    const lang = locale as keyof typeof SUPPORTED_LOCALES;

    const chapterNotFoundErrorDescriptions: Record<keyof typeof SUPPORTED_LOCALES, string> = {
        en: `There is no chapter of Qur'an in our library with number ${chapterNumber}.`,
        tr: `Veritabanımızda Kur'an'da ${chapterNumber} numaralı bir sure bulunamadı.`
    };

    const notFoundDescription = chapterNotFoundErrorDescriptions[lang] || chapterNotFoundErrorDescriptions.en;

    if (!chapterNumber)
        return <NotFoundError>{notFoundDescription}</NotFoundError>;


    const parsedChapterNumber = parseInt(chapterNumber);

    if (isNaN(parsedChapterNumber) || parsedChapterNumber <= 0 || parsedChapterNumber > 114)
        return <NotFoundError>{notFoundDescription}</NotFoundError>;


    const response = await getChapterData(parsedChapterNumber);

    switch (response.status) {
        case ResponseCodes.OK:
            const currentUrl = `https://scriptium.com/${locale}/i/q/${chapterNumber}`;
            await ServerUtils.General.Pages.upsertUrlToSitemap(currentUrl)

            return <Client chapter={response.data}/>;
        case ResponseCodes.NOT_FOUND:
            return <NotFoundError>{notFoundDescription}</NotFoundError>;
        case ResponseCodes.TOO_MANY_REQUESTS:
            return <RateLimitError/>;
        case ResponseCodes.INTERNAL_SERVER_ERROR:
            return <ServerError/>;
        case ResponseCodes.UNKNOWN_ERROR:
        default:
            return <UnknownError/>;
    }
};

export default Page;