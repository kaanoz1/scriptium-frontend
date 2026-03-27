import {TVerseTranslationPlain} from "@/dto/Islam/Quran/VerseTranslation/Plain";

export class VerseTranslationPlain {
    private readonly _text: string;

    constructor(data: TVerseTranslationPlain) {
        this._text = data.text;
    }

    static fromJson(data: TVerseTranslationPlain): VerseTranslationPlain {
        return new VerseTranslationPlain(data);
    }

    get text(): string {
        return this._text;
    }
}