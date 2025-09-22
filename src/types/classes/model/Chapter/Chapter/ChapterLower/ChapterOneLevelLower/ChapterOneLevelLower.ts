import {
  Verse,
  T_VerseConstructorParametersJSON,
} from "@/types/classes/model/Verse/Verse/Verse";
import { ChapterMeaning } from "../../../Util/ChapterMeaning/ChapterMeaning";
import {
  T_ChapterConstructorParameters,
  T_ChapterConstructorParametersJSON,
  Chapter,
} from "../../Chapter";

export type T_ChapterOneLevelLowerConstructorParameters =
  T_ChapterConstructorParameters & {
    verses: Array<Verse>;
  };
export type T_ChapterOneLevelLowerConstructorParametersJSON =
  T_ChapterConstructorParametersJSON & {
    verses: Array<T_VerseConstructorParametersJSON>;
  };

export class ChapterOneLevelLower extends Chapter {
  private readonly verses: Array<Verse>;

  constructor(data: T_ChapterOneLevelLowerConstructorParameters) {
    super({ ...data });
    this.verses = data.verses;
  }

  static override createFromJSON(
    data: T_ChapterOneLevelLowerConstructorParametersJSON
  ): ChapterOneLevelLower {
    const verses = data.verses.map(Verse.createFromJSON);
    const meanings = data.meanings.map(ChapterMeaning.createFromJSON);
    return new ChapterOneLevelLower({ ...data, verses, meanings });
  }

  getVerses(): ReadonlyArray<Verse> {
    return this.verses;
  }
}
