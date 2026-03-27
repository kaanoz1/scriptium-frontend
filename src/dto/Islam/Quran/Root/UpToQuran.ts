import {TRootComplete} from "@/dto/Islam/Quran/Root/Complete";
import {TWordUpToQuran} from "@/dto/Islam/Quran/Word/UpToQuran";

export type TRootUpToQuran = {
    words: Array<TWordUpToQuran>
} & TRootComplete;
