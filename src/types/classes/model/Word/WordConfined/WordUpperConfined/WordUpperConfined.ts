import {
  VerseUpperConfined,
  T_VerseUpperConfinedConstructorParametersJSON,
} from "../../../Verse/VerseConfined/VerseUpperConfined/VerseUpperConfined";
import {
  T_WordConfinedConstructorParameters,
  T_WordConfinedConstructorParametersJSON,
  WordConfined,
} from "../WordConfined";

export type T_WordUpperConfinedConstructorParameters =
  T_WordConfinedConstructorParameters & {
    verse: VerseUpperConfined;
  };
export type T_WordUpperConfinedConstructorParametersJSON =
  T_WordConfinedConstructorParametersJSON & {
    verse: T_VerseUpperConfinedConstructorParametersJSON;
  };

export class WordUpperConfined extends WordConfined {
  private readonly verse: Readonly<VerseUpperConfined>;

  constructor(data: T_WordUpperConfinedConstructorParameters) {
    super({ ...data });
    this.verse = data.verse;
  }

  static createFromJSON(
    data: T_WordUpperConfinedConstructorParametersJSON
  ): WordUpperConfined {
    const verse = VerseUpperConfined.createFromJSON(data.verse);

    return new WordUpperConfined({ ...data, verse });
  }

  getVerse(): Readonly<VerseUpperConfined> {
    return Object.freeze(this.verse);
  }
}
