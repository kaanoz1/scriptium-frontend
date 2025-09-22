import {
  T_ChapterOneLevelUpperConstructorParametersJSON,
  ChapterOneLevelUpper,
} from "@/types/classes/model/Chapter/Chapter/ChapterUpper/ChapterOneLevelUpper/ChapterOneLevelUpper";
import { TranslationText } from "@/types/classes/model/TranslationText/TranslationText/TranslationText";
import { Transliteration } from "@/types/classes/model/Transliteration/Transliteration";
import {
  T_VerseConstructorParameters,
  T_VerseConstructorParametersJSON,
  Verse,
} from "../../Verse";
import { Vocalization } from "../../../Util/Vocalization";
import { Chapter } from "@/types/classes/model/Chapter/Chapter/Chapter";

export type T_VerseOneLevelUpperConstructorParameters =
  T_VerseConstructorParameters & { chapter: Chapter };
export type T_VerseOneLevelUpperConstructorParametersJSON =
  T_VerseConstructorParametersJSON & {
    chapter: T_ChapterOneLevelUpperConstructorParametersJSON;
  };

export class VerseOneLevelUpper extends Verse {
  private readonly _chapter: Chapter;

  constructor(data: T_VerseOneLevelUpperConstructorParameters) {
    super({ ...data });
    this._chapter = data.chapter;
  }

  static override createFromJSON(
    data: T_VerseOneLevelUpperConstructorParametersJSON
  ): VerseOneLevelUpper {
    const variation = Vocalization.createFromJSON(data.variation);
    const chapter = ChapterOneLevelUpper.createFromJSON(data.chapter);
    const transliterations = data.transliterations.map(
      Transliteration.createFromJSON
    );
    const translationTexts = data.translationTexts.map(
      TranslationText.createFromJSON
    );
    return new VerseOneLevelUpper({
      ...data,
      variation,
      transliterations,
      translationTexts,
      chapter,
    });
  }

  getChapter(): Readonly<Chapter> {
    return Object.freeze(this._chapter);
  }
}
