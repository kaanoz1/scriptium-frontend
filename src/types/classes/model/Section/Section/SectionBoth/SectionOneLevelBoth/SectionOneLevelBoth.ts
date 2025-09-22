import {
  Scripture,
  T_ScriptureConstructorParametersJSON,
} from "@/types/classes/model/Scripture/Scripture/Scripture";
import {
  T_SectionMeanConstructorParameters,
  T_SectionMeanConstructorParametersJSON,
} from "../../../SectionMean/SectionMean";
import { SectionMeaning } from "../../../Util/SectionMeaning/SectionMeaning";
import { Section } from "../../Section";
import {
  Chapter,
  T_ChapterConstructorParametersJSON,
} from "@/types/classes/model/Chapter/Chapter/Chapter";

export type T_SectionOneLevelBothConstructorParameters =
  T_SectionMeanConstructorParameters & {
    chapters: Array<Chapter>;
    scripture: Scripture;
  };

export type T_SectionOneLevelBothConstructorParametersJSON =
  T_SectionMeanConstructorParametersJSON & {
    chapters: Array<T_ChapterConstructorParametersJSON>;
    scripture: T_ScriptureConstructorParametersJSON;
  };

export class SectionOneLevelBoth extends Section {
  private readonly chapters: Array<Chapter>;
  private readonly scripture: Scripture;

  constructor(data: T_SectionOneLevelBothConstructorParameters) {
    super({ ...data });

    this.chapters = data.chapters;
    this.scripture = data.scripture;
  }

  getChapters(): ReadonlyArray<Chapter> {
    return this.chapters;
  }

  getScripture(): Readonly<Scripture> {
    return this.scripture;
  }

  getChapterCount(): number {
    return this.getChapters().length;
  }

  static override createFromJSON(
    data: T_SectionOneLevelBothConstructorParametersJSON
  ): SectionOneLevelBoth {
    const chapters = data.chapters.map(Chapter.createFromJSON);
    const scripture = Scripture.createFromJSON(data.scripture);
    const meanings = data.meanings.map(SectionMeaning.createFromJSON);
    return new SectionOneLevelBoth({
      ...data,
      chapters,
      scripture,
      meanings,
    });
  }
}
