import {TWordPlain} from "@/dto/Islam/Quran/Word/Plain";

export class WordPlain {
    private readonly _text: string;
    private readonly _sequence: number;

    constructor(data: TWordPlain) {
        this._sequence = data.sequence;
        this._text = data.text;
    }

    public get text(){
        return this._text;
    }

    public get sequence(){
        return this._sequence;
    }
}

