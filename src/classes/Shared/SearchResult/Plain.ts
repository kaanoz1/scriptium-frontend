import {VerseTranslationWithVerse} from "@/classes/Islam/Quran/VerseTranslation/WithVerse";
import {TSearchResultPlain} from "@/dto/Shared/SearchResult/Plain";

export class SearchResultPlain {
    private readonly _verses : Array<VerseTranslationWithVerse>

    constructor(data: TSearchResultPlain) {
        this._verses = data.verses.map(VerseTranslationWithVerse.fromJson)
    }

    static fromJson(data: TSearchResultPlain): SearchResultPlain {
        return new SearchResultPlain(data);
    }

    public get verses(){
        return this._verses;
    }
}