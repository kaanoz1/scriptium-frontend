import {
  Section,
  T_SectionConstructorParametersJSON,
} from "@/types/classes/model/Section/Section/Section";
import { ChapterMeaning } from "../../../Util/ChapterMeaning/ChapterMeaning";
import {
  T_ChapterConstructorParameters,
  T_ChapterConstructorParametersJSON,
  Chapter,
} from "../../Chapter";

export type T_ChapterOneLevelUpperConstructorParameters =
  T_ChapterConstructorParameters & { section: Section };
export type T_ChapterOneLevelUpperConstructorParametersJSON =
  T_ChapterConstructorParametersJSON & {
    section: T_SectionConstructorParametersJSON;
  };

export class ChapterOneLevelUpper extends Chapter {
  private readonly section: Readonly<Section>;

  constructor(data: T_ChapterOneLevelUpperConstructorParameters) {
    super({ ...data });

    this.section = data.section;
  }

  static override createFromJSON(
    data: T_ChapterOneLevelUpperConstructorParametersJSON
  ): ChapterOneLevelUpper {
    const meanings = data.meanings.map(ChapterMeaning.createFromJSON);
    const section = Section.createFromJSON(data.section);
    return new ChapterOneLevelUpper({ ...data, meanings, section });
  }

  getSection(): Readonly<Section> {
    return this.section;
  }
}
