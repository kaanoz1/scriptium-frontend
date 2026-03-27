import {TRootComplete} from "@/dto/Islam/Quran/Root/Complete";
import {TWordUpToVerse} from "@/dto/Islam/Quran/Word/UpToVerse";

export type TRootUpToVerse = {
    words: Array<TWordUpToVerse>
} & TRootComplete;