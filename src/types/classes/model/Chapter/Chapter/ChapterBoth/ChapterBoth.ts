import {
  SectionUpper,
  T_SectionUpperConstructorParametersJSON,
} from "../../../Section/Section/SectionUpper/SectionUpper";
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

export type T_ChapterBothConstructorParameters =
  T_ChapterConstructorParameters & {
    section: SectionUpper;
    verses: Array<VerseLower>;
  };

export type T_ChapterBothConstructorParametersJSON =
  T_ChapterConstructorParametersJSON & {
    section: T_SectionUpperConstructorParametersJSON;
    verses: Array<T_VerseLowerConstructorParametersJSON>;
  };

export class ChapterBoth extends Chapter {
  private readonly section: SectionUpper;

  private readonly verses: Array<VerseLower>;

  constructor(data: T_ChapterBothConstructorParameters) {
    super({ ...data });

    this.verses = data.verses;
    this.section = data.section;
  }

  static override createFromJSON(
    data: T_ChapterBothConstructorParametersJSON
  ): ChapterBoth {
    const section = SectionUpper.createFromJSON(data.section);
    const verses = data.verses.map(VerseLower.createFromJSON);
    const meanings = data.meanings.map(ChapterMeaning.createFromJSON);
    return new ChapterBoth({ ...data, verses, section, meanings });
  }

  getSection(): Readonly<SectionUpper> {
    return this.section;
  }

  getVerses(): ReadonlyArray<VerseLower> {
    return this.verses;
  }
}
