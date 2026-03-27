import {RootComplete} from "./Complete";
import {TRootUpToQuran} from "@/dto/Islam/Quran/Root/UpToQuran";
import {WordUpToQuran} from "@/classes/Islam/Quran/Word/UpToQuran";

export class RootUpToQuran extends RootComplete {
    private readonly _words: Array<WordUpToQuran>

    constructor(data: TRootUpToQuran) {
        super(data);
        this._words = data.words.map(WordUpToQuran.fromJson)
    }

    static fromJson(data: TRootUpToQuran) {
        return new RootUpToQuran(data);
    }

    public get words() {
        return this._words;
    }

}

