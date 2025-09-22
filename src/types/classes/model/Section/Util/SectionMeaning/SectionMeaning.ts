import {
  T_MeaningConstructorParameters,
  T_MeaningConstructorParametersJSON,
  Meaning,
} from "@/types/classes/util/Meaning/Meaning";
import { Language } from "../../../Language/Language";

export type T_SectionMeaningConstructorParameters =
  T_MeaningConstructorParameters;
export type T_SectionMeaningConstructorParametersJSON =
  T_MeaningConstructorParametersJSON;

export class SectionMeaning extends Meaning {
  constructor(data: T_SectionMeaningConstructorParameters) {
    super({ ...data });
  }

  static override createFromJSON(
    data: T_SectionMeaningConstructorParametersJSON
  ): SectionMeaning {
    const language = Language.createFromJSON(data.language);
    return new SectionMeaning({ ...data, language });
  }
}
