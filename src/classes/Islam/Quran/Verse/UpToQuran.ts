import {ChapterUpToQuran} from "@/classes/Islam/Quran/Chapter/UpToQuran";
import {TVerseUpToQuran} from "@/dto/Islam/Quran/Verse/UpToQuran";
import {VerseComplete} from "@/classes/Islam/Quran/Verse/Complete";


export class VerseUpToQuran extends VerseComplete {
    private readonly _chapter: ChapterUpToQuran;

    constructor(data: TVerseUpToQuran) {
        super(data);
        this._chapter = ChapterUpToQuran.fromJson(data.chapter)
    }

    public static fromJson(data: TVerseUpToQuran) {
        return new VerseUpToQuran(data)
    }

    public get chapter() {
        return this._chapter;
    }
}


