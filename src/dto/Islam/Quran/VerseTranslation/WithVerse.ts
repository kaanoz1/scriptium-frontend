import {TVerseTransliterationUpToQuran} from "@/dto/Islam/Quran/Verse/TransliterationUpToQuran";
import {TVerseTranslationComplete} from "@/dto/Islam/Quran/VerseTranslation/Complete";

export type TVerseTranslationWithVerse = {
    verse: TVerseTransliterationUpToQuran
} & TVerseTranslationComplete;