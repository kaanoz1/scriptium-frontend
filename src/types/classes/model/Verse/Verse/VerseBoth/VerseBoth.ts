import {
  ChapterUpper,
  T_ChapterUpperConstructorParametersJSON,
} from "../../../Chapter/Chapter/ChapterUpper/ChapterUpper";
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

export type T_VerseBothConstructorParameters = T_VerseConstructorParameters & {
  chapter: ChapterUpper;
  words: Array<WordLower>;
};
export type T_VerseBothConstructorParametersJSON =
  T_VerseConstructorParametersJSON & {
    chapter: T_ChapterUpperConstructorParametersJSON;
    words: Array<T_WordLowerConstructorParametersJSON>;
  };

export class VerseBoth extends Verse {
  private readonly chapter: ChapterUpper;
  private readonly _words: Array<WordLower>;

  constructor(data: T_VerseBothConstructorParameters) {
    super({ ...data });

    this.chapter = data.chapter;
    this._words = data.words;
  }

  static override createFromJSON(
    data: T_VerseBothConstructorParametersJSON
  ): VerseBoth {
    const variation = Vocalization.createFromJSON(data.variation);
    const words = data.words.map((w) => WordLower.createFromJSON(w));
    const chapter = ChapterUpper.createFromJSON(data.chapter);
    const transliterations = data.transliterations.map(
      Transliteration.createFromJSON
    );
    const translationTexts = data.translationTexts.map(
      TranslationText.createFromJSON
    );
    return new VerseBoth({
      ...data,
      variation,
      words,
      chapter,
      transliterations,
      translationTexts,
    });
  }

  getChapter(): Readonly<ChapterUpper> {
    return Object.freeze(this.chapter);
  }

  getWords(): ReadonlyArray<WordLower> {
    return Object.freeze([...this._words]);
  }
}
