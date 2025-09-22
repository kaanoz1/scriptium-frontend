import { TranslationText } from "../../TranslationText/TranslationText/TranslationText";
import { Transliteration } from "../../Transliteration/Transliteration";
import { Vocalization } from "../Util/Vocalization";
import {
  T_VerseSimpleConstructorParameters,
  T_VerseSimpleConstructorParametersJSON,
  VerseSimple,
} from "../VerseSimple/VerseSimple";

export type T_VerseConstructorParameters = T_VerseSimpleConstructorParameters;
export type T_VerseConstructorParametersJSON =
  T_VerseSimpleConstructorParametersJSON;

export class Verse extends VerseSimple {
  constructor(data: T_VerseConstructorParameters) {
    super({ ...data });
  }

  static createFromJSON(data: T_VerseConstructorParametersJSON): Verse {
    const variation = Vocalization.createFromJSON(data.variation);
    const transliterations = data.transliterations.map(
      Transliteration.createFromJSON
    );
    const translationTexts = data.translationTexts.map(
      TranslationText.createFromJSON
    );
    return new Verse({
      ...data,
      variation,
      transliterations,
      translationTexts,
    });
  }
}
