import {
  Chapter,
  T_ChapterConstructorParametersJSON,
} from "@/types/classes/model/Chapter/Chapter/Chapter";
import { SectionMeaning } from "../../../Util/SectionMeaning/SectionMeaning";
import {
  T_SectionConstructorParameters,
  T_SectionConstructorParametersJSON,
  Section,
} from "../../Section";

export type T_SectionOneLevelLowerConstructorParameters =
  T_SectionConstructorParameters & {
    chapters: Array<Chapter>;
  };
export type T_SectionOneLevelLowerConstructorParametersJSON =
  T_SectionConstructorParametersJSON & {
    chapters: Array<T_ChapterConstructorParametersJSON>;
  };

export class SectionOneLevelLower extends Section {
  private readonly chapters: Array<Chapter>;

  constructor(data: T_SectionOneLevelLowerConstructorParameters) {
    super({ ...data });
    this.chapters = data.chapters;
  }

  static override createFromJSON(
    data: T_SectionOneLevelLowerConstructorParametersJSON
  ): SectionOneLevelLower {
    const meanings = data.meanings.map(SectionMeaning.createFromJSON);
    const chapters = data.chapters.map(Chapter.createFromJSON);
    return new SectionOneLevelLower({ ...data, meanings, chapters });
  }

  getChapters(): ReadonlyArray<Chapter> {
    return this.chapters;
  }
}
