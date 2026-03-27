import {WordPlain} from "@/classes/Islam/Quran/Word/Plain";
import {MeaningPlain} from "@/classes/Shared/Meaning/Plain";
import {TWordMeaning} from "@/dto/Islam/Quran/Word/Meaning";

export class WordMeaning extends WordPlain{
    private readonly _meanings: Array<MeaningPlain>

    constructor(data: TWordMeaning) {
        super(data);
        this._meanings = data.meanings.map(MeaningPlain.fromJson)
    }

    public get meaning(){
        return this._meanings;
    }
}
