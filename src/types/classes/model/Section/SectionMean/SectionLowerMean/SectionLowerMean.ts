import {
  ChapterLowerMean,
  T_ChapterLowerMeanConstructorParametersJSON,
} from "../../../Chapter/ChapterMean/ChapterLowerMean/ChapterLowerMean";
import { SectionMeaning } from "../../Util/SectionMeaning/SectionMeaning";
import {
  T_SectionMeanConstructorParameters,
  T_SectionMeanConstructorParametersJSON,
  SectionMean,
} from "../SectionMean";

export type T_SectionLowerMeanConstructorParameters =
  T_SectionMeanConstructorParameters & {
    chapters: Array<ChapterLowerMean>;
  };

export type T_SectionLowerMeanConstructorParametersJSON =
  T_SectionMeanConstructorParametersJSON & {
    chapters: Array<T_ChapterLowerMeanConstructorParametersJSON>;
  };

export class SectionLowerMean extends SectionMean {
  private readonly chapters: Array<ChapterLowerMean>;

  constructor(data: T_SectionLowerMeanConstructorParameters) {
    super({ ...data });

    this.chapters = data.chapters;
  }

  static override createFromJSON(
    data: T_SectionLowerMeanConstructorParametersJSON
  ): SectionLowerMean {
    const meanings = data.meanings.map(SectionMeaning.createFromJSON);
    const chapters = data.chapters.map(ChapterLowerMean.createFromJSON);
    return new SectionLowerMean({ ...data, meanings, chapters });
  }

  getChapters(): ReadonlyArray<ChapterLowerMean> {
    return Object.freeze([...this.chapters]);
  }
}
