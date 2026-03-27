import {TransliterationPlain} from "@/classes/Shared/Transliteration/Plain";
import {TWordTransliteration} from "@/dto/Islam/Quran/Word/Transliteration";
import {WordPlain} from "@/classes/Islam/Quran/Word/Plain";

export class WordTransliteration extends WordPlain {
    private readonly _transliterations: Array<TransliterationPlain>

    constructor(data: TWordTransliteration) {
        super(data);
        this._transliterations = data.transliterations.map(TransliterationPlain.fromJson)
    }

    public get transliterations() {
        return this._transliterations;
    }
}


