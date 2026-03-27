import {LanguagePlain} from "@/classes/Shared/Language/Plain";
import {MeaningPlain} from "@/classes/Shared/Meaning/Plain";
import {AuthorPlain} from "@/classes/Shared/Author/Plain";
import {TAuthorComplete} from "@/dto/Shared/Author/Complete";

export class AuthorComplete extends AuthorPlain {
    private readonly _language: LanguagePlain;
    private readonly _nameTranslations: Array<MeaningPlain>

    constructor(data: TAuthorComplete) {
        super(data);
        this._language = LanguagePlain.fromJson(data.language);
        this._nameTranslations = data.nameTranslations.map(MeaningPlain.fromJson);
    }

    static fromJson(data: TAuthorComplete): AuthorComplete {
        return new AuthorComplete(data);
    }

    get language() {
        return this._language;
    }

    get nameTranslations() {
        return this._nameTranslations;
    }

}