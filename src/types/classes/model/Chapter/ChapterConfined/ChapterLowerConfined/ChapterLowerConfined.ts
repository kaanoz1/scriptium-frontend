import {
  VerseLowerConfined,
  T_VerseLowerConfinedConstructorParametersJSON,
} from "../../../Verse/VerseConfined/VerseLowerConfined/VerseLowerConfined";
import {
  T_ChapterBaseConstructorParameters,
  T_ChapterBaseConstructorParametersJSON,
} from "../../ChapterBase/ChapterBase";
import { ChapterConfined } from "../ChapterConfined";

export type T_ChapterLowerConfinedConstructorParameters =
  T_ChapterBaseConstructorParameters & {
    verses: Array<VerseLowerConfined>;
  };

export type T_ChapterLowerConfinedConstructorParametersJSON =
  T_ChapterBaseConstructorParametersJSON & {
    verses: Array<T_VerseLowerConfinedConstructorParametersJSON>;
  };

export class ChapterLowerConfined extends ChapterConfined {
  private readonly verses: ReadonlyArray<VerseLowerConfined>;

  constructor(data: T_ChapterLowerConfinedConstructorParameters) {
    super({ ...data });

    this.verses = data.verses;
  }

  static createFromJSON(
    data: T_ChapterLowerConfinedConstructorParametersJSON
  ): ChapterLowerConfined {
    const verses = data.verses.map(VerseLowerConfined.createFromJSON);
    return new ChapterLowerConfined({ ...data, verses });
  }

  getVerses(): ReadonlyArray<VerseLowerConfined> {
    return this.verses;
  }
}
