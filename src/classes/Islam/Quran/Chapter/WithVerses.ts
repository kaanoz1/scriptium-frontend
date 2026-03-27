import {ChapterComplete} from "@/classes/Islam/Quran/Chapter/Complete";
import {VerseComplete} from "@/classes/Islam/Quran/Verse/Complete";
import {TChapterWithVerses} from "@/dto/Islam/Quran/Chapter/WithVerses";

export class ChapterWithVerses extends ChapterComplete {
    private readonly _verses: Array<VerseComplete>

    constructor(data: TChapterWithVerses) {
        super(data);
        this._verses = data.verses.map(VerseComplete.fromJson);
    }

    static fromJson(data: TChapterWithVerses): ChapterWithVerses {
        return new ChapterWithVerses(data);
    }

    get verses(): Array<VerseComplete> {
        return this._verses;
    }


}