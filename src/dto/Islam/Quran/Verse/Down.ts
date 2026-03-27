import {TVerseComplete} from "@/dto/Islam/Quran/Verse/Complete";
import {TWordDown} from "@/dto/Islam/Quran/Word/Down";

export type TVerseDown = {
    words: Array<TWordDown>
} & TVerseComplete