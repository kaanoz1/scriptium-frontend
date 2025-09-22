import { T_ChapterUpperConstructorParametersJSON } from "../../../Chapter/Chapter/ChapterUpper/ChapterUpper";
import { ChapterUpperMean } from "../../../Chapter/ChapterMean/ChapterUpperMean/ChapterUpperMean";
import { Vocalization } from "../../Util/Vocalization";
import {
  T_VerseMeanConstructorParameters,
  T_VerseMeanConstructorParametersJSON,
  VerseMean,
} from "../VerseMean";

export type T_VerseUpperMeanConstructorParameters =
  T_VerseMeanConstructorParameters & {
    chapter: ChapterUpperMean;
  };
export type T_VerseUpperMeanConstructorParametersJSON =
  T_VerseMeanConstructorParametersJSON & {
    chapter: T_ChapterUpperConstructorParametersJSON;
  };

export class VerseUpperMean extends VerseMean {
  private readonly _chapter: ChapterUpperMean;

  constructor(data: T_VerseUpperMeanConstructorParameters) {
    super({ ...data });
    this._chapter = data.chapter;
  }

  static override createFromJSON(
    data: T_VerseUpperMeanConstructorParametersJSON
  ): VerseUpperMean {
    const variation = Vocalization.createFromJSON(data.variation);
    const chapter = ChapterUpperMean.createFromJSON(data.chapter);

    return new VerseUpperMean({ ...data, variation, chapter });
  }

  getChapter(): Readonly<ChapterUpperMean> {
    return Object.freeze(this._chapter);
  }
}
