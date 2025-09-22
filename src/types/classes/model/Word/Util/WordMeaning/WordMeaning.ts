import {
  T_MeaningConstructorParameters,
  T_MeaningConstructorParametersJSON,
  Meaning,
} from "@/types/classes/util/Meaning/Meaning";
import { Language } from "../../../Language/Language";

export type T_WordMeaningConstructorParameters = T_MeaningConstructorParameters;
export type T_WordMeaningConstructorParametersJSON =
  T_MeaningConstructorParametersJSON;

export class WordMeaning extends Meaning {
  constructor(data: T_WordMeaningConstructorParameters) {
    super({ ...data });
  }

  static override createFromJSON(
    data: T_WordMeaningConstructorParametersJSON
  ): WordMeaning {
    const language = Language.createFromJSON(data.language);
    return new WordMeaning({ ...data, language });
  }
}
