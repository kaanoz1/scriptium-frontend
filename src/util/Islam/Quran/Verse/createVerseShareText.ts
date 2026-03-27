"use client"

import {VerseComplete} from "@/classes/Islam/Quran/Verse/Complete";
import {ChapterComplete} from "@/classes/Islam/Quran/Chapter/Complete";
import {TranslationPlain} from "@/classes/Islam/Quran/Translation/Plain";
import {VerseTranslationComplete} from "@/classes/Islam/Quran/VerseTranslation/Complete";

export const createVerseShareText = (chapter: ChapterComplete, verse: VerseComplete, translations: Array<TranslationPlain>, locale: string) => {



    const chapterNumber = chapter.sequence;
    const chapterMeaning = chapter.meanings.find((meaning) => meaning.language.code === locale)?.text ?? chapter.meanings.find((meaning) => meaning.language.code === "en")?.text ?? chapter.name;
    const verseNumber = verse.sequence;
    const verseText = verse.simple;
    const preferredTranslationsOrdered: VerseTranslationComplete[] = [];

    for (const t of translations){
        const foundVerseTranslation = verse.translations.find(vt => vt.translation.id === t.id)

        if(foundVerseTranslation)
            preferredTranslationsOrdered.push(foundVerseTranslation);
    }

    const translationShown = preferredTranslationsOrdered;

    let result = "";

    result += `Qur'an, ${chapterNumber}.${chapterMeaning}:${verseNumber}\n`
    result += verseText + "\n\n";

    for(const t of translationShown){
        const translationName = t.translation.name;
        const translationText = t.text;

        result += translationName + "\n";
        result += translationText + "\n\n";
    }

    if (typeof window !== 'undefined')
        result += window.location.href;

    return result.trim();
}