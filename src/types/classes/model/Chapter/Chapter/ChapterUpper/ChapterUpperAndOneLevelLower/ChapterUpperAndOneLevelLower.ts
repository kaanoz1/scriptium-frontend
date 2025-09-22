import { SectionUpper } from "@/types/classes/model/Section/Section/SectionUpper/SectionUpper";
import {
  Verse,
  T_VerseConstructorParametersJSON,
} from "@/types/classes/model/Verse/Verse/Verse";
import { ChapterMeaning } from "../../../Util/ChapterMeaning/ChapterMeaning";
import {
  T_ChapterUpperConstructorParameters,
  T_ChapterUpperConstructorParametersJSON,
  ChapterUpper,
} from "../ChapterUpper";

export type T_ChapterUpperAndOneLevelLowerConstructorParameters =
  T_ChapterUpperConstructorParameters & {
    verses: Array<Verse>;
  };

export type T_ChapterUpperAndOneLevelLowerConstructorParametersJSON =
  T_ChapterUpperConstructorParametersJSON & {
    verses: Array<T_VerseConstructorParametersJSON>;
  };

export class ChapterUpperAndOneLevelLower extends ChapterUpper {
  private verses: Array<Verse>;

  constructor(data: T_ChapterUpperAndOneLevelLowerConstructorParameters) {
    super({ ...data });
    this.verses = data.verses;
  }

  static override createFromJSON(
    data: T_ChapterUpperAndOneLevelLowerConstructorParametersJSON
  ): ChapterUpperAndOneLevelLower {
    const meanings = data.meanings.map(ChapterMeaning.createFromJSON);
    const section = SectionUpper.createFromJSON(data.section);
    const verses = data.verses.map(Verse.createFromJSON);
    return new ChapterUpperAndOneLevelLower({
      ...data,
      verses,
      meanings,
      section,
    });
  }

  getVerses(): Array<Verse> {
    return this.verses;
  }
}
