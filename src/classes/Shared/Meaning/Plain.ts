import {TMeaningPlain} from "@/dto/Shared/Meaning/Plain";
import {LanguagePlain} from "@/classes/Shared/Language/Plain";

export class MeaningPlain {
    private readonly _text: string;
    private readonly _language: LanguagePlain;

    constructor(data: TMeaningPlain) {
        this._text = data.text;
        this._language = LanguagePlain.fromJson(data.language);
    }

    static fromJson(data: TMeaningPlain): MeaningPlain {
        return new MeaningPlain(data);
    }

    public get text() {
        return this._text;
    }

    public get language() {
        return this._language;
    }

}