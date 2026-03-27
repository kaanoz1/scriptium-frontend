import {TransliterationPlain} from "@/classes/Shared/Transliteration/Plain";
import {MeaningPlain} from "@/classes/Shared/Meaning/Plain";
import {WordPlain} from "@/classes/Islam/Quran/Word/Plain";
import {TWordComplete} from "@/dto/Islam/Quran/Word/Complete";

export class WordComplete extends WordPlain {
    private readonly _meanings: Array<MeaningPlain>;
    private readonly _transliterations: Array<TransliterationPlain>

    constructor(data: TWordComplete) {
        super(data);
        this._meanings = data.meanings.map(MeaningPlain.fromJson);
        this._transliterations = data.transliterations.map(TransliterationPlain.fromJson);
    }

    public get meanings(){
        return this._meanings
    }

    public get transliterations(){
        return this._transliterations;
    }
}


