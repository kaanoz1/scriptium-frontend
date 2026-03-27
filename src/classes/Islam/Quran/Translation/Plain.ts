import {LanguagePlain} from "@/classes/Shared/Language/Plain";
import {TTranslationPlain} from "@/dto/Islam/Quran/Translation/Plain";

export class TranslationPlain {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _description: string | null;
    private readonly _language: LanguagePlain;

    constructor(data: TTranslationPlain) {
        this._id = data.id;
        this._name = data.name;
        this._description = data.description;
        this._language = LanguagePlain.fromJson(data.language);
    }

    static fromJson(data: TTranslationPlain): TranslationPlain {
        return new TranslationPlain(data);
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string | null {
        return this._description;
    }

    get language(): LanguagePlain {
        return this._language;
    }
}