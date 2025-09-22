import {
  T_MeaningConstructorParameters,
  T_MeaningConstructorParametersJSON,
  Meaning,
} from "@/types/classes/util/Meaning/Meaning";
import { Language } from "../../../Language/Language";

export type T_ScriptureMeaningConstructorParameters =
  T_MeaningConstructorParameters;
export type T_ScriptureMeaningConstructorParametersJSON =
  T_MeaningConstructorParametersJSON;

export class ScriptureMeaning extends Meaning {
  constructor(data: T_ScriptureMeaningConstructorParameters) {
    super({ ...data });
  }

  static override createFromJSON(
    data: T_ScriptureMeaningConstructorParametersJSON
  ): ScriptureMeaning {
    const language = Language.createFromJSON(data.language);
    return new ScriptureMeaning({ ...data, language });
  }
}
