import {WordComplete} from "@/classes/Islam/Quran/Word/Complete";
import {RootDown} from "@/classes/Islam/Quran/Root/Down";
import {TWordDown} from "@/dto/Islam/Quran/Word/Down";

export class WordDown extends WordComplete {
    private readonly _roots: Array<RootDown>

    constructor(data: TWordDown) {
        super(data);
        this._roots = data.roots.map(RootDown.fromJson);
    }

    public static fromJson(data: TWordDown): WordDown {
        return new WordDown(data);
    }

    public get roots() {
        return this._roots;
    }
}

