import {VerseUpToQuran} from "@/classes/Islam/Quran/Verse/UpToQuran";
import {TWordUpToQuran} from "@/dto/Islam/Quran/Word/UpToQuran";
import {WordComplete} from "@/classes/Islam/Quran/Word/Complete";

export class WordUpToQuran extends WordComplete {
    private readonly _verse: VerseUpToQuran;

    constructor(data: TWordUpToQuran) {
        super(data);
        this._verse = VerseUpToQuran.fromJson(data.verse);
    }

    public static fromJson(data: TWordUpToQuran) {
        return new WordUpToQuran(data)
    }

    public get verse() {
        return this._verse;
    }
}

