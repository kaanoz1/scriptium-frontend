import {TChapterUpToQuran} from "@/dto/Islam/Quran/Chapter/UpToQuran";
import {TVerseComplete} from "@/dto/Islam/Quran/Verse/Complete";

export type TVerseUpToQuran = {
    chapter: TChapterUpToQuran
} & TVerseComplete;