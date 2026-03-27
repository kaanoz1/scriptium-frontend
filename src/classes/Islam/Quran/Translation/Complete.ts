import {TranslationPlain} from "@/classes/Islam/Quran/Translation/Plain";
import {AuthorComplete} from "@/classes/Shared/Author/Complete";
import {TTranslationComplete} from "@/dto/Islam/Quran/Translation/Complete";

export class TranslationComplete extends TranslationPlain {
    private readonly _authors: Array<AuthorComplete>

    constructor(data: TTranslationComplete) {
        super(data);
        this._authors = data.authors.map(AuthorComplete.fromJson);
    }

    static fromJson(data: TTranslationComplete): TranslationComplete {
        return new TranslationComplete(data);
    }

    get authors(): Array<AuthorComplete> {
        return this._authors;
    }
}
