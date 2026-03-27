import {RootComplete} from "@/classes/Islam/Quran/Root/Complete";
import {WordUpToVerse} from "@/classes/Islam/Quran/Word/UpToVerse";
import {TRootUpToVerse} from "@/dto/Islam/Quran/Root/UpToVerse";

export class RootUpToVerse extends RootComplete {
    private readonly _words: Array<WordUpToVerse>

    constructor(data: TRootUpToVerse) {
        super(data);
        this._words = data.words.map(WordUpToVerse.fromJson)
    }

    public static fromJson(data: TRootUpToVerse) {
        return new RootUpToVerse(data);
    }

    public get words() {
        return this._words;
    }
}



