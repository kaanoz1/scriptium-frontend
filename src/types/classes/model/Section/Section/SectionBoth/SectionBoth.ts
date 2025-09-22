import {
  ChapterLower,
  T_ChapterLowerConstructorParametersJSON,
} from "../../../Chapter/Chapter/ChapterLower/ChapterLower";
import {
  Scripture,
  T_ScriptureConstructorParametersJSON,
} from "../../../Scripture/Scripture/Scripture";
import { SectionMeaning } from "../../Util/SectionMeaning/SectionMeaning";
import {
  T_SectionConstructorParameters,
  T_SectionConstructorParametersJSON,
  Section,
} from "../Section";

export type T_SectionBothConstructorParameters =
  T_SectionConstructorParameters & {
    scripture: Scripture;
    chapters: Array<ChapterLower>;
  };

export type T_SectionBothConstructorParametersJSON =
  T_SectionConstructorParametersJSON & {
    scripture: T_ScriptureConstructorParametersJSON;
    chapters: Array<T_ChapterLowerConstructorParametersJSON>;
  };

export class SectionBoth extends Section {
  private readonly scripture: Scripture;
  private readonly chapters: Array<ChapterLower>;

  constructor(data: T_SectionBothConstructorParameters) {
    super({ ...data });
    this.scripture = data.scripture;
    this.chapters = data.chapters;
  }

  static override createFromJSON(
    data: T_SectionBothConstructorParametersJSON
  ): SectionBoth {
    const scripture = Scripture.createFromJSON(data.scripture);
    const chapters = data.chapters.map(ChapterLower.createFromJSON);
    const meanings = data.meanings.map(SectionMeaning.createFromJSON);
    return new SectionBoth({ ...data, scripture, chapters, meanings });
  }

  getScripture(): Readonly<Scripture> {
    return this.scripture;
  }

  getChapters(): ReadonlyArray<ChapterLower> {
    return this.chapters;
  }
}
