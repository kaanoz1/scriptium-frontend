import { TranslationText } from "../../../TranslationText/TranslationText/TranslationText";
import { Transliteration } from "../../../Transliteration/Transliteration";
import {
  WordLower,
  T_WordLowerConstructorParametersJSON,
} from "../../../Word/Word/WordLower/WordLower";
import { Vocalization } from "../../Util/Vocalization";
import {
  T_VerseConstructorParameters,
  T_VerseConstructorParametersJSON,
  Verse,
} from "../Verse";

export type T_VerseLowerConstructorParameters = T_VerseConstructorParameters & {
  words: Array<WordLower>;
};
export type T_VerseLowerConstructorParametersJSON =
  T_VerseConstructorParametersJSON & {
    words: Array<T_WordLowerConstructorParametersJSON>;
  };

export class VerseLower extends Verse {
  private readonly _words: Array<WordLower>;

  constructor(data: T_VerseLowerConstructorParameters) {
    super({ ...data });
    this._words = data.words;
  }

  static override createFromJSON(
    data: T_VerseLowerConstructorParametersJSON
  ): VerseLower {
    const variation = Vocalization.createFromJSON(data.variation);
    const words = data.words.map((w) => WordLower.createFromJSON(w));
    const transliterations = data.transliterations.map(
      Transliteration.createFromJSON
    );
    const translationTexts = data.translationTexts.map(
      TranslationText.createFromJSON
    );
    return new VerseLower({
      ...data,
      words,
      variation,
      transliterations,
      translationTexts,
    });
  }

  getWords(): ReadonlyArray<WordLower> {
    return Object.freeze([...this._words]);
  }
}
