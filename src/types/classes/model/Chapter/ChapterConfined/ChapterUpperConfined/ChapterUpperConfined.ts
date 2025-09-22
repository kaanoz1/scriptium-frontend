import {
  SectionUpperConfined,
  T_SectionUpperConfinedConstructorParametersJSON,
} from "../../../Section/SectionConfined/SectionUpperConfined/SectionUpperConfined";
import {
  T_ChapterConfined,
  T_ChapterConfinedJSON,
  ChapterConfined,
} from "../ChapterConfined";

export type T_ChapterUpperConfinedConstructorParameters = T_ChapterConfined & {
  section: SectionUpperConfined;
};
export type T_ChapterUpperConfinedConstructorParametersJSON =
  T_ChapterConfinedJSON & {
    section: T_SectionUpperConfinedConstructorParametersJSON;
  };

export class ChapterUpperConfined extends ChapterConfined {
  private readonly section: SectionUpperConfined;

  constructor(data: T_ChapterUpperConfinedConstructorParameters) {
    super({ ...data });
    this.section = data.section;
  }

  static createFromJSON(
    data: T_ChapterUpperConfinedConstructorParametersJSON
  ): ChapterUpperConfined {
    const section = SectionUpperConfined.createFromJSON(data.section);
    return new ChapterUpperConfined({ ...data, section });
  }

  getSection(): Readonly<SectionUpperConfined> {
    return this.section;
  }
}
