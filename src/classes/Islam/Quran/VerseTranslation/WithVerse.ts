import {TVerseTranslationWithVerse} from "@/dto/Islam/Quran/VerseTranslation/WithVerse";
import {VerseTranslationComplete} from "@/classes/Islam/Quran/VerseTranslation/Complete";
import {VerseTransliterationUpToQuran} from "@/classes/Islam/Quran/Verse/TransliterationUpToQuran";


export class VerseTranslationWithVerse extends VerseTranslationComplete {
    private readonly _verse: VerseTransliterationUpToQuran

    constructor(data: TVerseTranslationWithVerse) {
        super(data);
        this._verse = VerseTransliterationUpToQuran.fromJson(data.verse)
    }

    static fromJson(data: TVerseTranslationWithVerse): VerseTranslationWithVerse {
        return new VerseTranslationWithVerse(data);
    }

    public get verse() {
        return this._verse;
    }
}

