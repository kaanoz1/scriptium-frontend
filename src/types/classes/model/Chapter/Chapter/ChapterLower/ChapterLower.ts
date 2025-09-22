import {
  VerseLower,
  T_VerseLowerConstructorParametersJSON,
} from "../../../Verse/Verse/VerseLower/VerseLower";
import { ChapterMeaning } from "../../Util/ChapterMeaning/ChapterMeaning";
import {
  T_ChapterConstructorParameters,
  T_ChapterConstructorParametersJSON,
  Chapter,
} from "../Chapter";

export type T_ChapterLowerConstructorParameters =
  T_ChapterConstructorParameters & {
    verses: Array<VerseLower>;
  };
export type T_ChapterLowerConstructorParametersJSON =
  T_ChapterConstructorParametersJSON & {
    verses: Array<T_VerseLowerConstructorParametersJSON>;
  };

export class ChapterLower extends Chapter {
  private readonly verses: Array<VerseLower>;

  constructor(data: T_ChapterLowerConstructorParameters) {
    super({ ...data });
    this.verses = data.verses;
  }

  static override createFromJSON(
    data: T_ChapterLowerConstructorParametersJSON
  ): ChapterLower {
    const verses = data.verses.map(VerseLower.createFromJSON);
    const meanings = data.meanings.map(ChapterMeaning.createFromJSON);
    return new ChapterLower({ ...data, verses, meanings });
  }

  getVerses(): ReadonlyArray<VerseLower> {
    return this.verses;
  }
}
