import {TLanguagePlain} from "@/dto/Shared/Language/Plain";

export type TTranslationPlain = {
    id: number;
    name: string;
    description: null | string;
    language: TLanguagePlain;
}