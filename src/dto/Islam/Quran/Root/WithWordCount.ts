import {TRootComplete} from "@/dto/Islam/Quran/Root/Complete";

export type TRootWithWordCount = {
    occurrences: number;
} & TRootComplete;