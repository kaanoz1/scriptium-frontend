import {TTranslationComplete} from "@/dto/Islam/Quran/Translation/Complete";
import {TFootnotePlain} from "@/dto/Shared/Footnote/Plain";
import {TVerseTranslationPlain} from "@/dto/Islam/Quran/VerseTranslation/Plain";

export type TVerseTranslationComplete = {
    footnotes: Array<TFootnotePlain>,
    translation: TTranslationComplete
} & TVerseTranslationPlain;