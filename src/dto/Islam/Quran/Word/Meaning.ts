import {TWordPlain} from "@/dto/Islam/Quran/Word/Plain";
import {TMeaningPlain} from "@/dto/Shared/Meaning/Plain";

export type TWordMeaning = {
    meanings: Array<TMeaningPlain>,
} & TWordPlain;