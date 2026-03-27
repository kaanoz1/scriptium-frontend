import {TChapterPlain} from "@/dto/Islam/Quran/Chapter/Plain";

export type TVersePlainWithPlainChapter = {
    chapter: TChapterPlain;
} & TChapterPlain;