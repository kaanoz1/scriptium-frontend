import {TChapterWithVerseCount} from "@/dto/Islam/Quran/Chapter/WithVerseCount";
import {ChapterComplete} from "./Complete";

export class ChapterWithVerseCount extends ChapterComplete {
    private readonly _verseCount: number;

    constructor(data: TChapterWithVerseCount) {
        super(data);
        this._verseCount = data.verseCount;
    }

    static fromJson(data: TChapterWithVerseCount): ChapterWithVerseCount {
        return new ChapterWithVerseCount(data);
    }

    get verseCount(): number {
        return this._verseCount;
    }
}