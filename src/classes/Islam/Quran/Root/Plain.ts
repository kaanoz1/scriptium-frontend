import {TRootPlain} from "@/dto/Islam/Quran/Root/Plain";

export class RootPlain {
    private readonly _text: string;
    private readonly _latin: string;

    constructor(data: TRootPlain) {
        this._text = data.text;
        this._latin = data.latin;
    }

    public static fromJson(data: TRootPlain) {
        return new RootPlain(data);
    }

    public get text() {
        return this._text;
    }

    public get latin(){
        return this._latin;
    }
}


