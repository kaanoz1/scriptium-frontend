import {
  VerseLowerMean,
  T_VerseLowerMeanConstructorParametersJSON,
} from "../../../Verse/VerseMean/VerseLowerMean/VerseLowerMean";
import { ChapterMeaning } from "../../Util/ChapterMeaning/ChapterMeaning";
import {
  T_ChapterMeanConstructorParameters,
  T_ChapterMeanConstructorParametersJSON,
  ChapterMean,
} from "../ChapterMean";

export type T_ChapterLowerMeanConstructorParameters =
  T_ChapterMeanConstructorParameters & {
    verses: Array<VerseLowerMean>;
  };

export type T_ChapterLowerMeanConstructorParametersJSON =
  T_ChapterMeanConstructorParametersJSON & {
    verses: Array<T_VerseLowerMeanConstructorParametersJSON>;
  };

export class ChapterLowerMean extends ChapterMean {
  private readonly verses: Array<VerseLowerMean>;

  constructor(data: T_ChapterLowerMeanConstructorParameters) {
    super({ ...data });

    this.verses = data.verses;
  }

  static override createFromJSON(
    data: T_ChapterLowerMeanConstructorParametersJSON
  ): ChapterLowerMean {
    const meanings = data.meanings.map(ChapterMeaning.createFromJSON);
    const verses = data.verses.map(VerseLowerMean.createFromJSON);
    return new ChapterLowerMean({ ...data, meanings, verses });
  }

  getVerses(): ReadonlyArray<VerseLowerMean> {
    return Object.freeze([...this.verses]);
  }
}
