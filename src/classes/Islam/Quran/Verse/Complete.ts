import {VersePlain} from "./Plain";
import {TransliterationPlain} from "@/classes/Shared/Transliteration/Plain";
import {TVerseComplete} from "@/dto/Islam/Quran/Verse/Complete";
import {VerseTranslationComplete} from "@/classes/Islam/Quran/VerseTranslation/Complete";

export class VerseComplete extends VersePlain {
    private readonly _transliterations: Array<TransliterationPlain>
    private readonly _translations: Array<VerseTranslationComplete>

    constructor(data: TVerseComplete) {
        super(data);
        this._transliterations = data.transliterations.map(TransliterationPlain.fromJson);
        this._translations = data.translations.map(VerseTranslationComplete.fromJson);
    }

    static fromJson(data: TVerseComplete): VerseComplete {
        return new VerseComplete(data);
    }

    get transliterations() {
        return this._transliterations;
    }

    get translations() {
        return this._translations;
    }
}