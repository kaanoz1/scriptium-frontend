import {TTransliterationPlain} from "@/dto/Shared/Transliteration/Plain";
import {TMeaningPlain} from "@/dto/Shared/Meaning/Plain";
import {TWordPlain} from "@/dto/Islam/Quran/Word/Plain";

export type TWordComplete = {
    meanings: Array<TMeaningPlain>,
    transliterations: Array<TTransliterationPlain>,
} & TWordPlain;