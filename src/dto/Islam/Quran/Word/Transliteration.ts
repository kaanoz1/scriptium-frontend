import {TTransliterationPlain} from "@/dto/Shared/Transliteration/Plain";
import {TWordPlain} from "@/dto/Islam/Quran/Word/Plain";

export type TWordTransliteration = {
    transliterations: Array<TTransliterationPlain>
}  & TWordPlain;