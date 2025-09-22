import {
  SectionUpper,
  T_SectionUpperConstructorParametersJSON,
} from "../../../Section/Section/SectionUpper/SectionUpper";
import { ChapterMeaning } from "../../Util/ChapterMeaning/ChapterMeaning";
import {
  T_ChapterConstructorParameters,
  T_ChapterConstructorParametersJSON,
  Chapter,
} from "../Chapter";

export type T_ChapterUpperConstructorParameters =
  T_ChapterConstructorParameters & { section: SectionUpper };
export type T_ChapterUpperConstructorParametersJSON =
  T_ChapterConstructorParametersJSON & {
    section: T_SectionUpperConstructorParametersJSON;
  };

export class ChapterUpper extends Chapter {
  private readonly section: Readonly<SectionUpper>;

  constructor(data: T_ChapterUpperConstructorParameters) {
    super({ ...data });
    this.section = data.section;
  }

  static override createFromJSON(
    data: T_ChapterUpperConstructorParametersJSON
  ): ChapterUpper {
    const meanings = data.meanings.map(ChapterMeaning.createFromJSON);
    const section = SectionUpper.createFromJSON(data.section);
    return new ChapterUpper({ ...data, meanings, section });
  }

  getSection(): Readonly<SectionUpper> {
    return this.section;
  }
}
