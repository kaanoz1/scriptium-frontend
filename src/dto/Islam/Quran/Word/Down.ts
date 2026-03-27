import {TRootDown} from "@/dto/Islam/Quran/Root/Down";
import {TWordComplete} from "@/dto/Islam/Quran/Word/Complete";

export type TWordDown = {
    roots: Array<TRootDown>
} & TWordComplete