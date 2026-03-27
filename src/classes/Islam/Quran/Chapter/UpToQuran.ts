import {ChapterComplete} from "@/classes/Islam/Quran/Chapter/Complete";
import {QuranPlain} from "@/classes/Islam/Quran/Plain";
import {TChapterUpToQuran} from "@/dto/Islam/Quran/Chapter/UpToQuran";

export class ChapterUpToQuran extends ChapterComplete {
    scripture: QuranPlain = new QuranPlain();

    constructor(data: TChapterUpToQuran) {
        super(data);
    }

    public static fromJson(data: TChapterUpToQuran) {
        return new ChapterUpToQuran(data);
    }
}