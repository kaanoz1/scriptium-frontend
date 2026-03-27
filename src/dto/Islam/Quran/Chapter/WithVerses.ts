import {TChapterComplete} from "@/dto/Islam/Quran/Chapter/Complete";
import {TVerseComplete} from "@/dto/Islam/Quran/Verse/Complete";

export type TChapterWithVerses = {
    verses: Array<TVerseComplete>;
} & TChapterComplete;