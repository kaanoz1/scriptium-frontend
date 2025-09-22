import { TranslationText } from "@/types/classes/model/TranslationText/TranslationText/TranslationText";
import { Transliteration } from "@/types/classes/model/Transliteration/Transliteration";
import {
  Word,
  T_WordConstructorParametersJSON,
} from "@/types/classes/model/Word/Word/Word";
import {
  T_VerseConstructorParameters,
  T_VerseConstructorParametersJSON,
  Verse,
} from "../../Verse";
import { Vocalization } from "../../../Util/Vocalization";

export type T_VerseOneLevelLowerConstructorParameters =
  T_VerseConstructorParameters & { words: Array<Word> };
export type T_VerseOneLevelLowerConstructorParametersJSON =
  T_VerseConstructorParametersJSON & {
    words: Array<T_WordConstructorParametersJSON>;
  };

export class VerseOneLevelLower extends Verse {
  private readonly _words: Array<Word>;

  constructor(data: T_VerseOneLevelLowerConstructorParameters) {
    super({ ...data });

    this._words = data.words;
  }

  static override createFromJSON(
    data: T_VerseOneLevelLowerConstructorParametersJSON
  ): VerseOneLevelLower {
    const variation = Vocalization.createFromJSON(data.variation);
    const words = data.words.map((w) => Word.createFromJSON(w));
    const transliterations = data.transliterations.map(
      Transliteration.createFromJSON
    );
    const translationTexts = data.translationTexts.map(
      TranslationText.createFromJSON
    );
    return new VerseOneLevelLower({
      ...data,
      words,
      variation,
      transliterations,
      translationTexts,
    });
  }

  getWords(): ReadonlyArray<Word> {
    return Object.freeze([...this._words]);
  }
}
