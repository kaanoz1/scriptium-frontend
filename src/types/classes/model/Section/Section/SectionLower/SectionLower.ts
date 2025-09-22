import { ChapterLower, T_ChapterLowerConstructorParametersJSON } from "../../../Chapter/Chapter/ChapterLower/ChapterLower";
import { SectionMeaning } from "../../Util/SectionMeaning/SectionMeaning";
import { T_SectionConstructorParameters, T_SectionConstructorParametersJSON, Section } from "../Section";

export type T_SectionLowerConstructorParameters =
  T_SectionConstructorParameters & {
    chapters: Array<ChapterLower>;
  };
export type T_SectionLowerConstructorParametersJSON =
  T_SectionConstructorParametersJSON & {
    chapters: Array<T_ChapterLowerConstructorParametersJSON>;
  };

export class SectionLower extends Section {
  private readonly chapters: ReadonlyArray<ChapterLower>;

  constructor(data: T_SectionLowerConstructorParameters) {
    super({ ...data });
    this.chapters = data.chapters;
  }

  static override createFromJSON(
    data: T_SectionLowerConstructorParametersJSON
  ): SectionLower {
    const chapters = data.chapters.map(ChapterLower.createFromJSON);
    const meanings = data.meanings.map(SectionMeaning.createFromJSON);
    return new SectionLower({ ...data, chapters, meanings });
  }

  getChapters(): ReadonlyArray<ChapterLower> {
    return this.chapters;
  }
}
