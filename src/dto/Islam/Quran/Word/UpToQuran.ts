import {TWordComplete} from "@/dto/Islam/Quran/Word/Complete";
import {TVerseUpToQuran} from "@/dto/Islam/Quran/Verse/UpToQuran";

export type TWordUpToQuran = {
    verse: TVerseUpToQuran
} & TWordComplete;