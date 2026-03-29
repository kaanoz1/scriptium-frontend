import {Metadata, NextPage} from "next";
import {cache} from "react";
import {ResponseCodes} from "@/util/types/ResponseCodes";
import {BackendApi} from "@/tool/Fetchers/BackendApi";
import {SUPPORTED_LOCALES} from "@/locale/SupportedLocales/_index";
import UnknownError from "@/util/components/Error/UnknownError";
import ServerError from "@/util/components/Error/ServerError";
import RateLimitError from "@/util/components/Error/RateLimitError";
import NotFoundError from "@/util/components/Error/NotFoundError";
import {ServerUtils} from "@/util/ServerUtils";
import {ClientUtils} from "@/util/ClientUtils";
import Client from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/client";
import {logger} from "@/lib/Logger";

type Props = {
    params: Promise<{ chapterNumber: string; verseNumber: string; locale: string }>;
};

const getVerseData = cache(async (chapter: number, verse: number) => {
    return await BackendApi.VerseController.get(chapter, verse);
});

const Page: NextPage<Props> = async ({params}) => {
    const {chapterNumber, verseNumber, locale} = await params;
    const lang = (locale as keyof typeof SUPPORTED_LOCALES) || "en";

    const cNum = parseInt(chapterNumber);
    const vNum = parseInt(verseNumber);

    const errorMsgs = {
        en: `Verse ${chapterNumber}:${verseNumber} could not be found in our database.`,
        tr: `Veritabanımızda ${chapterNumber}:${verseNumber} numaralı ayet bulunamadı.`
    };

    if (isNaN(cNum) || isNaN(vNum)) {
        return <NotFoundError>{errorMsgs[lang] || errorMsgs.en}</NotFoundError>;
    }

    const response = await getVerseData(cNum, vNum);


    switch (response.status) {
        case ResponseCodes.OK:
            const currentUrl = `https://scriptium.com/${locale}/i/q/${chapterNumber}/${verseNumber}`;
            await ServerUtils.General.Pages.upsertUrlToSitemap(currentUrl);

            return <Client verse={response.data}/>;
        case ResponseCodes.NOT_FOUND:
            return <NotFoundError>{errorMsgs[lang] || errorMsgs.en}</NotFoundError>;
        case ResponseCodes.TOO_MANY_REQUESTS:
            return <RateLimitError/>;
        case ResponseCodes.INTERNAL_SERVER_ERROR:
            return <ServerError/>;
        default:
            return <UnknownError/>;
    }
};

export default Page;

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {chapterNumber, verseNumber, locale} = await params;
    const lang = (locale as keyof typeof SUPPORTED_LOCALES) || "en";

    const cNum = parseInt(chapterNumber);
    const vNum = parseInt(verseNumber);

    const titles = {
        notFound: {en: "Verse Not Found - Scriptium", tr: "Ayet Bulunamadı - Scriptium"},
        error: {en: "Error - Scriptium", tr: "Hata - Scriptium"}
    };

    const isChapterValid = (!isNaN(cNum) && Number.isInteger(cNum) && cNum > 0 && cNum < 114);

    const chapterVerseLimit = ClientUtils.Islam.Quran.Verse.CountIndicator[cNum - 1]

    const isVerseValid = (!isNaN(vNum) && Number.isInteger(vNum) && vNum > 0 && vNum <= chapterVerseLimit)


    if (!(isChapterValid && isVerseValid)) {
        return {title: titles.notFound[lang] || titles.notFound.en};
    }

    const response = await getVerseData(cNum, vNum);

    if (response.status !== ResponseCodes.OK || !response.data) {
        return {title: titles.error[lang] || titles.error.en};
    }

    const {words, chapter} = response.data

    const possibleChapterMeanings = response.data.chapter.meanings;

    const meaning = possibleChapterMeanings.find(m => m.language.code === locale)?.text || possibleChapterMeanings.find(m => m.language.code == "en")?.text || chapter.name;

    const titleLabel = `${cNum}:${vNum}`;

    return {
        title: `Scriptium - ${titleLabel}`,
        description: meaning || "Read Quranic verses with translations."
    };
}
