import {
  ChapterOneLevelLower,
  T_ChapterOneLevelLowerConstructorParametersJSON,
} from "@/types/classes/model/Chapter/Chapter/ChapterLower/ChapterOneLevelLower/ChapterOneLevelLower";
import { SectionMeaning } from "../../../Util/SectionMeaning/SectionMeaning";
import {
  T_SectionConstructorParameters,
  T_SectionConstructorParametersJSON,
  Section,
} from "../../Section";

export type T_SectionTwoLevelLowerConstructorParameters =
  T_SectionConstructorParameters & {
    chapters: Array<ChapterOneLevelLower>;
  };

export type T_SectionTwoLevelLowerConstructorParametersJSON =
  T_SectionConstructorParametersJSON & {
    chapters: Array<T_ChapterOneLevelLowerConstructorParametersJSON>;
  };

export class SectionTwoLevelLower extends Section {
  private readonly chapters: Array<ChapterOneLevelLower>;

  constructor(data: T_SectionTwoLevelLowerConstructorParameters) {
    super({ ...data });
    this.chapters = data.chapters;
  }

  static override createFromJSON(
    data: T_SectionTwoLevelLowerConstructorParametersJSON
  ) {
    const chapters = data.chapters.map(ChapterOneLevelLower.createFromJSON);
    const meanings = data.meanings.map(SectionMeaning.createFromJSON);
    return new SectionTwoLevelLower({ ...data, meanings, chapters });
  }

  getChapters(): ReadonlyArray<ChapterOneLevelLower> {
    return Object.freeze([...this.chapters]);
  }
}
