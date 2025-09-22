import {
  T_ChapterBaseConstructorParameters,
  T_ChapterBaseConstructorParametersJSON,
  ChapterBase,
} from "../ChapterBase/ChapterBase";
import {
  ChapterMeaning,
  T_ChapterMeaningConstructorParametersJSON,
} from "../Util/ChapterMeaning/ChapterMeaning";

export type T_ChapterMeanConstructorParameters =
  T_ChapterBaseConstructorParameters & {
    meanings: Array<ChapterMeaning>;
  };

export type T_ChapterMeanConstructorParametersJSON =
  T_ChapterBaseConstructorParametersJSON & {
    meanings: Array<T_ChapterMeaningConstructorParametersJSON>;
  };

export class ChapterMean extends ChapterBase {
  private readonly meanings: Array<ChapterMeaning>;

  constructor(data: T_ChapterMeanConstructorParameters) {
    super({ ...data });

    this.meanings = data.meanings;
  }

  static createFromJSON(
    data: T_ChapterMeanConstructorParametersJSON
  ): ChapterMean {
    const meanings = data.meanings.map(ChapterMeaning.createFromJSON);
    return new ChapterMean({ ...data, meanings });
  }

  getMeanings(): ReadonlyArray<ChapterMeaning> {
    return Object.freeze([...this.meanings]);
  }
}
