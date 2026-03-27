import {TWordDown} from "@/dto/Islam/Quran/Word/Down";
import {TVerseComplete} from "@/dto/Islam/Quran/Verse/Complete";
import {TChapterUpToQuran} from "@/dto/Islam/Quran/Chapter/UpToQuran";

export type TVerseBoth = {
    words: Array<TWordDown>,
    chapter: TChapterUpToQuran
} & TVerseComplete
