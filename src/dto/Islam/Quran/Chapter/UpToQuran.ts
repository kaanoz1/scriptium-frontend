import {TChapterComplete} from "@/dto/Islam/Quran/Chapter/Complete";
import {TQuranPlain} from "@/dto/Islam/Quran/Plain";


export type TChapterUpToQuran = {
    scripture: TQuranPlain
} & TChapterComplete;
