import {TransliterationPlain} from "@/classes/Shared/Transliteration/Plain";
import {TVerseTransliterationUpToQuran} from "@/dto/Islam/Quran/Verse/TransliterationUpToQuran";
import {VersePlainUpToQuran} from "@/classes/Islam/Quran/Verse/PlainUpToQuran";


export class VerseTransliterationUpToQuran extends VersePlainUpToQuran{
    private readonly _transliterations: Array<TransliterationPlain>

    constructor(data: TVerseTransliterationUpToQuran) {
        super(data);
        this._transliterations = data.transliterations.map(TransliterationPlain.fromJson)
    }

    static fromJson(data: TVerseTransliterationUpToQuran){
        return new VerseTransliterationUpToQuran(data)
    }

    public get transliterations(){
        return this._transliterations
    }
}

