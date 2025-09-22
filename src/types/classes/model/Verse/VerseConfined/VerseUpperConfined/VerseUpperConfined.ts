import {
  ChapterUpperConfined,
  T_ChapterUpperConfinedConstructorParametersJSON,
} from "../../../Chapter/ChapterConfined/ChapterUpperConfined/ChapterUpperConfined";
import { Vocalization } from "../../Util/Vocalization";
import {
  T_VerseConfinedConstructorParameters,
  T_VerseConfinedConstructorParametersJSON,
  VerseConfined,
} from "../VerseConfined";

export type T_VerseUpperConfinedConstructorParameters =
  T_VerseConfinedConstructorParameters & {
    chapter: ChapterUpperConfined;
  };
export type T_VerseUpperConfinedConstructorParametersJSON =
  T_VerseConfinedConstructorParametersJSON & {
    chapter: T_ChapterUpperConfinedConstructorParametersJSON;
  };

export class VerseUpperConfined extends VerseConfined {
  private readonly _chapter: Readonly<ChapterUpperConfined>;

  constructor(data: T_VerseUpperConfinedConstructorParameters) {
    super({ ...data });
    this._chapter = data.chapter;
  }

  static createFromJSON(
    data: T_VerseUpperConfinedConstructorParametersJSON
  ): VerseUpperConfined {
    const variation = Vocalization.createFromJSON(data.variation);
    const chapter = ChapterUpperConfined.createFromJSON(data.chapter);
    return new VerseUpperConfined({ ...data, chapter, variation });
  }

  getChapter(): Readonly<ChapterUpperConfined> {
    return Object.freeze(this._chapter);
  }
}
