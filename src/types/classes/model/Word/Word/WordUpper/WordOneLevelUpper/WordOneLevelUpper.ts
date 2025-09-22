import {
  Verse,
  T_VerseConstructorParametersJSON,
} from "@/types/classes/model/Verse/Verse/Verse";
import { Meaning } from "@/types/classes/util/Meaning/Meaning";
import {
  T_WordConstructorParameters,
  T_WordConstructorParametersJSON,
  Word,
} from "../../Word";
import { Vocalization } from "@/types/classes/model/Verse/Util/Vocalization";

export type T_WordOneLevelUpperConstructorParameters =
  T_WordConstructorParameters & { verse: Verse };
export type T_WordOneLevelUpperConstructorParametersJSON =
  T_WordConstructorParametersJSON & {
    verse: T_VerseConstructorParametersJSON;
  };

export class WordOneLevelUpper extends Word {
  private readonly verse: Readonly<Verse>;

  constructor(data: T_WordOneLevelUpperConstructorParameters) {
    super({ ...data });
    this.verse = data.verse;
  }

  static override createFromJSON(
    data: T_WordOneLevelUpperConstructorParametersJSON
  ): WordOneLevelUpper {
    const variation = Vocalization.createFromJSON(data.variation);
    const meanings = data.meanings.map((m) => Meaning.createFromJSON(m));
    const verse = Verse.createFromJSON(data.verse);

    return new WordOneLevelUpper({ ...data, variation, meanings, verse });
  }

  getVerse(): Readonly<Verse> {
    return Object.freeze(this.verse);
  }
}
