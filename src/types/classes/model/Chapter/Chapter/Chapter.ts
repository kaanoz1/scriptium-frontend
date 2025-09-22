import {
  T_ChapterSimpleConstructorParameters,
  T_ChapterSimpleConstructorParametersJSON,
  ChapterSimple,
} from "../ChapterSimple/ChapterSimple";
import { ChapterMeaning } from "../Util/ChapterMeaning/ChapterMeaning";

export type T_ChapterConstructorParameters =
  T_ChapterSimpleConstructorParameters;
export type T_ChapterConstructorParametersJSON =
  T_ChapterSimpleConstructorParametersJSON;

export class Chapter extends ChapterSimple {
  protected override readonly meanings: Array<ChapterMeaning>;

  constructor(data: T_ChapterSimpleConstructorParameters) {
    super({ ...data });

    this.meanings = data.meanings;
  }

  static createFromJSON(data: T_ChapterConstructorParametersJSON): Chapter {
    const meanings = data.meanings.map(ChapterMeaning.createFromJSON);
    return new Chapter({ ...data, meanings });
  }
}
