import {VerseComplete} from "@/classes/Islam/Quran/Verse/Complete";
import {TWordUpToVerse} from "@/dto/Islam/Quran/Word/UpToVerse";
import {WordComplete} from "@/classes/Islam/Quran/Word/Complete";

export class WordUpToVerse extends WordComplete {
    private readonly _verse: VerseComplete;

    constructor(data: TWordUpToVerse) {
        super(data);
        this._verse = VerseComplete.fromJson(data.verse)
    }

    static fromJson(data: TWordUpToVerse) {
        return new WordUpToVerse(data)
    }

    public get verse() {
        return this._verse;
    }
}

