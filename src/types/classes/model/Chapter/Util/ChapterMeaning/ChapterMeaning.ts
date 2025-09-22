import {
  T_MeaningConstructorParameters,
  T_MeaningConstructorParametersJSON,
  Meaning,
} from "@/types/classes/util/Meaning/Meaning";
import { Language } from "../../../Language/Language";

export type T_ChapterMeaningConstructorParameters =
  T_MeaningConstructorParameters;
export type T_ChapterMeaningConstructorParametersJSON =
  T_MeaningConstructorParametersJSON;

export class ChapterMeaning extends Meaning {
  constructor(data: T_ChapterMeaningConstructorParameters) {
    super({ ...data });
  }

  static override createFromJSON(
    data: T_ChapterMeaningConstructorParametersJSON
  ): ChapterMeaning {
    const language = Language.createFromJSON(data.language);
    return new ChapterMeaning({ ...data, language });
  }
}
