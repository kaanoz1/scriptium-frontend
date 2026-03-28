import {TRootWithWordCount} from "@/dto/Islam/Quran/Root/WithWordCount";
import {RootComplete} from "@/classes/Islam/Quran/Root/Complete";

export class RootWithWordCount extends RootComplete {
    private readonly _occurrences: number;


    constructor(data: TRootWithWordCount) {
        super(data);
        this._occurrences = data.occurrences;
    }

    static fromJson(data: TRootWithWordCount): RootWithWordCount {
        return new RootWithWordCount(data);
    }


    public get occurrences() {
        return this._occurrences;
    }


}