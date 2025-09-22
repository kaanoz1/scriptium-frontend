import { Meaning } from "@/types/classes/util/Meaning/Meaning";
import {
  VerseUpper,
  T_VerseUpperConstructorParametersJSON,
} from "../../../Verse/Verse/VerseUpper/VerseUpper";
import {
  T_WordConstructorParameters,
  T_WordConstructorParametersJSON,
  Word,
} from "../Word";
import { Vocalization } from "../../../Verse/Util/Vocalization";

export type T_WordUpperConstructorParameters = T_WordConstructorParameters & {
  verse: VerseUpper;
};
export type T_WordUpperConstructorParametersJSON =
  T_WordConstructorParametersJSON & {
    verse: T_VerseUpperConstructorParametersJSON;
  };

export class WordUpper extends Word {
  private verse: VerseUpper;

  constructor(data: T_WordUpperConstructorParameters) {
    super({ ...data });
    this.verse = data.verse;
  }

  static override createFromJSON(
    data: T_WordUpperConstructorParametersJSON
  ): WordUpper {
    const variation = Vocalization.createFromJSON(data.variation);
    const meanings = data.meanings.map((m) => Meaning.createFromJSON(m));
    const verse = VerseUpper.createFromJSON(data.verse);
    return new WordUpper({ ...data, variation, meanings, verse });
  }

  getVerse(): VerseUpper {
    return this.verse;
  }
}
