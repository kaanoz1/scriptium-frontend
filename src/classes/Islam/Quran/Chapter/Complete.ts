import {TChapterComplete} from "@/dto/Islam/Quran/Chapter/Complete";
import {ChapterPlain} from "./Plain";
import {MeaningPlain} from "@/classes/Shared/Meaning/Plain";

export class ChapterComplete extends ChapterPlain {
    private readonly _meanings: ReadonlyArray<MeaningPlain>;

    constructor(data: TChapterComplete) {
        super(data);
        this._meanings = Object.freeze([...data.meanings].map(MeaningPlain.fromJson));
    }

    static fromJson(data: TChapterComplete): ChapterComplete {
        return new ChapterComplete(data);
    }

    get meanings() {
        return this._meanings;
    }
}