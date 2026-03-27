import {ChapterUpToQuran} from "@/classes/Islam/Quran/Chapter/UpToQuran";
import {ChapterPlain} from "@/classes/Islam/Quran/Chapter/Plain";
import {TVersePlainUpToQuran} from "@/dto/Islam/Quran/Verse/PlainUpToQuran";

export class VersePlainUpToQuran extends ChapterPlain {
    private readonly _chapter: ChapterUpToQuran;

    constructor(data: TVersePlainUpToQuran) {
        super(data);
        this._chapter = ChapterUpToQuran.fromJson(data.chapter)
    }

    public get chapter() {
        return this._chapter;
    }
}

