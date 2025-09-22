import {
  T_ChapterBaseConstructorParameters,
  T_ChapterBaseConstructorParametersJSON,
  ChapterBase,
} from "../ChapterBase/ChapterBase";
import {
  ChapterMeaning,
  T_ChapterMeaningConstructorParametersJSON,
} from "../Util/ChapterMeaning/ChapterMeaning";

export type T_ChapterSimpleConstructorParameters =
  T_ChapterBaseConstructorParameters & {
    meanings: Array<ChapterMeaning>;
  };

export type T_ChapterSimpleConstructorParametersJSON =
  T_ChapterBaseConstructorParametersJSON & {
    meanings: Array<T_ChapterMeaningConstructorParametersJSON>;
  };

export abstract class ChapterSimple extends ChapterBase {
  protected readonly meanings: ReadonlyArray<ChapterMeaning> = [];

  constructor(data: T_ChapterSimpleConstructorParameters) {
    super({ ...data });
    this.meanings = data.meanings;
  }

  getMeanings(): ReadonlyArray<ChapterMeaning> {
    return this.meanings;
  }
}
