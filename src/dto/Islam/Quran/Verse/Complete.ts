import {TVersePlain} from "@/dto/Islam/Quran/Verse/Plain";
import {TTransliterationPlain} from "@/dto/Shared/Transliteration/Plain";
import {TVerseTranslationComplete} from "@/dto/Islam/Quran/VerseTranslation/Complete";

export type TVerseComplete = {
    transliterations: Array<TTransliterationPlain>,
    translations: Array<TVerseTranslationComplete>,
} & TVersePlain