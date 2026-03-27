import {TRootComplete} from "@/dto/Islam/Quran/Root/Complete";
import {RootPlain} from "@/classes/Islam/Quran/Root/Plain";


export class RootComplete extends RootPlain {


    constructor(data: TRootComplete) {
        super(data);
    }

    public static fromJson(data: TRootComplete) {
        return new RootComplete(data);
    }
}

