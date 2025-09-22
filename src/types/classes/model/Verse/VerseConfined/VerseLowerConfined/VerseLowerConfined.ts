import {
  WordLowerConfined,
  T_WordLowerConfinedConstructorParametersJSON,
} from "../../../Word/WordConfined/WordLowerConfined/WordLowerConfined";
import { Vocalization } from "../../Util/Vocalization";
import {
  T_VerseConfinedConstructorParameters,
  T_VerseConfinedConstructorParametersJSON,
  VerseConfined,
} from "../VerseConfined";

export type T_VerseLowerConfinedConstructorParameters =
  T_VerseConfinedConstructorParameters & {
    words: Array<WordLowerConfined>;
  };
export type T_VerseLowerConfinedConstructorParametersJSON =
  T_VerseConfinedConstructorParametersJSON & {
    words: Array<T_WordLowerConfinedConstructorParametersJSON>;
  };

export class VerseLowerConfined extends VerseConfined {
  private readonly _words: ReadonlyArray<WordLowerConfined>;

  constructor(data: T_VerseLowerConfinedConstructorParameters) {
    super({ ...data });
    this._words = data.words;
  }

  static createFromJSON(
    data: T_VerseLowerConfinedConstructorParametersJSON
  ): VerseLowerConfined {
    const variation = Vocalization.createFromJSON(data.variation);
    const words = data.words.map((w) => WordLowerConfined.createFromJSON(w));
    return new VerseLowerConfined({ ...data, words, variation });
  }

  getWords(): ReadonlyArray<WordLowerConfined> {
    return Object.freeze([...this._words]);
  }
}
