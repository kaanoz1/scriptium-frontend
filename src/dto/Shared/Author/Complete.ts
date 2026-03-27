import {TMeaningPlain} from "@/dto/Shared/Meaning/Plain";
import {TLanguagePlain} from "@/dto/Shared/Language/Plain";
import {TAuthorPlain} from "@/dto/Shared/Author/Plain";

export type TAuthorComplete = {
    language: TLanguagePlain;
    nameTranslations: Array<TMeaningPlain>
} & TAuthorPlain;