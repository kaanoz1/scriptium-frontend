import {TAuthorPlain} from "@/dto/Shared/Author/Plain";

export class AuthorPlain {
    private readonly _name: string;
    private readonly _url: string | null;
    private readonly _description: string | null;

    constructor(data: TAuthorPlain) {
        this._name = data.name;
        this._url = data.url;
        this._description = data.description;
    }

    static fromJson(data: TAuthorPlain): AuthorPlain {
        return new AuthorPlain(data);
    }

    get name(): string {
        return this._name;
    }

    get url(): string | null {
        return this._url;
    }

    get description(): string | null {
        return this._description;
    }
}