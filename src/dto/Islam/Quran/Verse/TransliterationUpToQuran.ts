import {TTransliterationPlain} from "@/dto/Shared/Transliteration/Plain";
import {TVerseUpToQuran} from "@/dto/Islam/Quran/Verse/UpToQuran";
import {TVersePlainUpToQuran} from "@/dto/Islam/Quran/Verse/PlainUpToQuran";

export type TVerseTransliterationUpToQuran = {
    transliterations: Array<TTransliterationPlain>
} & TVersePlainUpToQuran;