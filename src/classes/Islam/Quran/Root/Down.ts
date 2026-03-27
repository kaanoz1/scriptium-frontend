import {TRootDown} from "@/dto/Islam/Quran/Root/Down";
import {RootComplete} from "@/classes/Islam/Quran/Root/Complete";


export class RootDown extends RootComplete {


    constructor(data: TRootDown) {
        super(data);
    }

    public static fromJson(data: TRootDown) {
        return new RootDown(data);
    }
}


