import {TFootnotePlain} from "@/dto/Shared/Footnote/Plain";

export class FootnotePlain {
    private readonly _text: string;
    private readonly _index: number;
    private readonly _indicator: string;

    constructor(data: TFootnotePlain) {
        this._text = data.text;
        this._index = data.index;
        this._indicator = data.indicator;
    }

    static fromJson(data: TFootnotePlain): FootnotePlain {
        return new FootnotePlain(data);
    }

    get text(): string {
        return this._text;
    }

    get index(): number {
        return this._index;
    }

    get indicator(): string {
        return this._indicator;
    }
}