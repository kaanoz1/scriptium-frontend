import {TLanguagePlain} from "@/dto/Shared/Language/Plain";

export class LanguagePlain {
    public readonly _name: string;
    public readonly _nameEnglish: string;
    public readonly _code: string;

    constructor(data: TLanguagePlain) {
        this._name = data.name;
        this._nameEnglish = data.nameEnglish;
        this._code = data.code;
    }

    static fromJson(data: TLanguagePlain): LanguagePlain {
        return new LanguagePlain(data);
    }

    public get name() {
        return this._name;
    }

    public get nameEnglish() {
        return this._nameEnglish;
    }

    public get code() {
        return this._code;
    }

}