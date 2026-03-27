import {TTransliterationPlain} from "@/dto/Shared/Transliteration/Plain";
import {LanguagePlain} from "@/classes/Shared/Language/Plain";

export class TransliterationPlain {
    private readonly _text: string;
    private readonly _language: LanguagePlain;

    constructor(data: TTransliterationPlain) {
        this._text = data.text;
        this._language = LanguagePlain.fromJson(data.language);
    }

    static fromJson(data: TTransliterationPlain): TransliterationPlain {
        return new TransliterationPlain(data);
    }

    get text(): string {
        return this._text;
    }

    get language(): LanguagePlain {
        return this._language;
    }
}