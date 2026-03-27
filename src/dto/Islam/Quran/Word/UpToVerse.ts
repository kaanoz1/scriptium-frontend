import {TVerseComplete} from "@/dto/Islam/Quran/Verse/Complete";
import {TWordComplete} from "@/dto/Islam/Quran/Word/Complete";

export type TWordUpToVerse = {
    verse: TVerseComplete;
} & TWordComplete;