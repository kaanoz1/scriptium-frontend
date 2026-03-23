import {TChapterPlain} from "@/dto/Islam/Quran/Chapter/Plain";
import {TMeaningPlain} from "@/dto/Shared/Meaning/Plain";

export type TChapterComplete = {
    meanings: Array<TMeaningPlain>
} & TChapterPlain;