import {TChapterPlain} from "@/dto/Islam/Quran/Chapter/Plain";
import {TChapterUpToQuran} from "@/dto/Islam/Quran/Chapter/UpToQuran";

export type TVersePlainUpToQuran = {
    chapter: TChapterUpToQuran
} & TChapterPlain;