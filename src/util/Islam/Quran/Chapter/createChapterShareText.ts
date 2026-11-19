"use client"

import {ChapterComplete} from "@/classes/Islam/Quran/Chapter/Complete";

export const createChapterShareText = (chapter: ChapterComplete, locale: string) => {

    const chapterNumber = chapter.sequence;
    const chapterMeaning = chapter.meanings.find((meaning) => meaning.language.code === locale)?.text ?? chapter.meanings.find((meaning) => meaning.language.code === "en")?.text ?? chapter.name;


    let result = "";

    result += `Qur'an, ${chapterNumber}.${chapterMeaning}\n\n`

    result += `scriptium.net/${locale}/i/q/${chapterNumber}`;

    return result.trim();
}