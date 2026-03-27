import {VerseTranslationPlain} from "@/classes/Islam/Quran/VerseTranslation/Plain";
import {FootnotePlain} from "@/classes/Shared/Footnote/Plain";
import {TVerseTranslationComplete} from "@/dto/Islam/Quran/VerseTranslation/Complete";
import {TranslationComplete} from "@/classes/Islam/Quran/Translation/Complete";

export class VerseTranslationComplete extends VerseTranslationPlain{
    private readonly _footnotes: Array<FootnotePlain>
    private readonly _translation: TranslationComplete

    constructor(data: TVerseTranslationComplete) {
        super(data);
        this._footnotes = data.footnotes.map(FootnotePlain.fromJson);
        this._translation = TranslationComplete.fromJson(data.translation);
    }

    static fromJson(data: TVerseTranslationComplete): VerseTranslationComplete {
        return new VerseTranslationComplete(data);
    }

    get footnotes() {
        return this._footnotes;
    }

    get translation() {
        return this._translation;
    }
}