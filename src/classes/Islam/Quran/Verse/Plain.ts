import {TVersePlain} from "@/dto/Islam/Quran/Verse/Plain";

export class VersePlain {
    private readonly _sequence: number;
    private readonly _simple: string;
    private readonly _simplePlain: string;
    private readonly _simpleMinimal: string;
    private readonly _simpleClean: string;
    private readonly _uthmani: string;
    private readonly _uthmaniMinimal: string;

    constructor(data: TVersePlain) {
        this._sequence = data.sequence;
        this._simple = data.simple;
        this._simplePlain = data.simplePlain;
        this._simpleMinimal = data.simpleMinimal;
        this._simpleClean = data.simpleClean;
        this._uthmani = data.uthmani;
        this._uthmaniMinimal = data.uthmaniMinimal;
    }

    static fromJson(data: TVersePlain): VersePlain {
        return new VersePlain(data);
    }

    get sequence(): number {
        return this._sequence;
    }

    get simple(): string {
        return this._simple;
    }

    get simplePlain(): string {
        return this._simplePlain;
    }

    get simpleMinimal(): string {
        return this._simpleMinimal;
    }

    get simpleClean(): string {
        return this._simpleClean;
    }

    get uthmani(): string {
        return this._uthmani;
    }

    get uthmaniMinimal(): string {
        return this._uthmaniMinimal;
    }
}