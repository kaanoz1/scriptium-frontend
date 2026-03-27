import {ChapterPlain} from "@/classes/Islam/Quran/Chapter/Plain";
import {TVersePlainWithPlainChapter} from "@/dto/Islam/Quran/Verse/PlainWithPlainChapter";

export class VersePlainWithPlainChapter extends ChapterPlain {
    private readonly _chapter: ChapterPlain;

    constructor(data: TVersePlainWithPlainChapter) {
        super(data);
        this._chapter = ChapterPlain.fromJson(data.chapter)
    }

    public get chapter() {
        return this._chapter
    }
}


