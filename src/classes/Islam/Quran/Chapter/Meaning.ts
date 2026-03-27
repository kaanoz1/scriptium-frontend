import {MeaningPlain} from "@/classes/Shared/Meaning/Plain";
import {ChapterPlain} from "@/classes/Islam/Quran/Chapter/Plain";
import {TChapterMeaning} from "@/dto/Islam/Quran/Chapter/Meaning";

export class ChapterMeaning extends ChapterPlain {
    private readonly _meanings: Array<MeaningPlain>

    constructor(data: TChapterMeaning) {
        super(data);
        this._meanings = data.meanings.map(MeaningPlain.fromJson);

    }

    public static fromJson(data: TChapterMeaning) {
        return new ChapterMeaning(data);
    }

    public get meanings() {
        return this._meanings;
    }
}

