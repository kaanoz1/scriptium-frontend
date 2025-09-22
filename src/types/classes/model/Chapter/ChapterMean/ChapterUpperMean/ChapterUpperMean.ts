import {
  SectionUpperMean,
  T_SectionUpperMeanConstructorParametersJSON,
} from "../../../Section/SectionMean/SectionUpperMean/SectionUpperMean";
import { ChapterMeaning } from "../../Util/ChapterMeaning/ChapterMeaning";
import {
  T_ChapterMeanConstructorParameters,
  T_ChapterMeanConstructorParametersJSON,
  ChapterMean,
} from "../ChapterMean";

export type T_ChapterUpperMeanParams = T_ChapterMeanConstructorParameters & {
  section: SectionUpperMean;
};
export type T_ChapterUpperMeanConstructorParametersJSON =
  T_ChapterMeanConstructorParametersJSON & {
    section: T_SectionUpperMeanConstructorParametersJSON;
  };

export class ChapterUpperMean extends ChapterMean {
  private readonly section: Readonly<SectionUpperMean>;

  constructor(data: T_ChapterUpperMeanParams) {
    super({ ...data });

    this.section = data.section;
  }

  static override createFromJSON(
    data: T_ChapterUpperMeanConstructorParametersJSON
  ): ChapterUpperMean {
    const meanings = data.meanings.map(ChapterMeaning.createFromJSON);
    const section = SectionUpperMean.createFromJSON(data.section);
    return new ChapterUpperMean({ ...data, meanings, section });
  }

  getSection(): Readonly<SectionUpperMean> {
    return Object.freeze(this.section);
  }
}
