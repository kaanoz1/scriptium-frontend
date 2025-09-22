import {
  ChapterUpper,
  T_ChapterUpperConstructorParametersJSON,
} from "../../../Chapter/Chapter/ChapterUpper/ChapterUpper";
import { TranslationText } from "../../../TranslationText/TranslationText/TranslationText";
import { Transliteration } from "../../../Transliteration/Transliteration";
import { Vocalization } from "../../Util/Vocalization";
import {
  T_VerseSimpleConstructorParameters,
  T_VerseSimpleConstructorParametersJSON,
} from "../../VerseSimple/VerseSimple";
import { Verse } from "../Verse";

export type T_VerseUpperConstructorParameters =
  T_VerseSimpleConstructorParameters & { chapter: ChapterUpper };
export type T_VerseUpperConstructorParametersJSON =
  T_VerseSimpleConstructorParametersJSON & {
    chapter: T_ChapterUpperConstructorParametersJSON;
  };

export class VerseUpper extends Verse {
  private readonly _chapter: ChapterUpper;

  constructor(data: T_VerseUpperConstructorParameters) {
    super({ ...data });

    this._chapter = data.chapter;
  }

  static override createFromJSON(
    data: T_VerseUpperConstructorParametersJSON
  ): VerseUpper {
    const variation = Vocalization.createFromJSON(data.variation);
    const chapter = ChapterUpper.createFromJSON(data.chapter);
    const transliterations = data.transliterations.map(
      Transliteration.createFromJSON
    );
    const translationTexts = data.translationTexts.map(
      TranslationText.createFromJSON
    );
    return new VerseUpper({
      ...data,
      variation,
      chapter,
      transliterations,
      translationTexts,
    });
  }

  getChapter(): Readonly<ChapterUpper> {
    return Object.freeze(this._chapter);
  }
}
