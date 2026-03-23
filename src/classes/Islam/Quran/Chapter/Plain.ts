import {TChapterPlain} from "@/dto/Islam/Quran/Chapter/Plain";

export class ChapterPlain {
    private readonly _name: string;
    private readonly _sequence: number;

    constructor(data: TChapterPlain) {
        this._name = data.name;
        this._sequence = data.sequence;
    }

    static fromJson(data: TChapterPlain): ChapterPlain {
        return new ChapterPlain(data);
    }

    get name(): string {
        return this._name;
    }

    get sequence(): number {
        return this._sequence;
    }
}