import {TAuthorComplete} from "@/dto/Shared/Author/Complete";
import {TTranslationPlain} from "@/dto/Islam/Quran/Translation/Plain";

export type TTranslationComplete = {
    authors: Array<TAuthorComplete>;
} & TTranslationPlain;