import {
  ChapterLowerConfined,
  T_ChapterLowerConfinedConstructorParametersJSON,
} from "../../../Chapter/ChapterConfined/ChapterLowerConfined/ChapterLowerConfined";
import {
  T_SectionConfinedConstructorParameters,
  T_SectionConfinedConstructorParametersJSON,
  SectionConfined,
} from "../SectionConfined";

export type T_SectionLowerConfinedConstructorParameters =
  T_SectionConfinedConstructorParameters & {
    chapters: Array<ChapterLowerConfined>;
  };
export type T_SectionLowerConfinedConstructorParametersJSON =
  T_SectionConfinedConstructorParametersJSON & {
    chapters: Array<T_ChapterLowerConfinedConstructorParametersJSON>;
  };

export class SectionLowerConfined extends SectionConfined {
  private readonly chapters: ReadonlyArray<ChapterLowerConfined>;

  constructor(data: T_SectionLowerConfinedConstructorParameters) {
    super({ ...data });
    this.chapters = data.chapters;
  }

  static createFromJSON(
    data: T_SectionLowerConfinedConstructorParametersJSON
  ): SectionLowerConfined {
    const chapters = data.chapters.map(ChapterLowerConfined.createFromJSON);
    return new SectionLowerConfined({ ...data, chapters });
  }

  getChapters(): ReadonlyArray<ChapterLowerConfined> {
    return this.chapters;
  }
}
