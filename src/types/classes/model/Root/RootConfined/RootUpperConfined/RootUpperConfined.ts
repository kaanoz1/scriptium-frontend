import {
  T_WordUpperConfinedConstructorParametersJSON,
  WordUpperConfined,
} from "../../../Word/WordConfined/WordUpperConfined/WordUpperConfined";
import {
  T_RootConfinedConstructorParametersJSON,
  T_RootConfinedConstructorParameters,
  RootConfined,
} from "../RootConfined";

export type T_RootUpperConfinedConstructorParametersJSON =
  T_RootConfinedConstructorParametersJSON & {
    words: Array<T_WordUpperConfinedConstructorParametersJSON>;
  };
export type T_RootUpperConfinedConstructorParameters =
  T_RootConfinedConstructorParameters & {
    words: Array<WordUpperConfined>;
  };

export class RootUpperConfined extends RootConfined {
  private readonly words: Array<WordUpperConfined>;

  constructor(data: T_RootUpperConfinedConstructorParameters) {
    super({ ...data });
    this.words = data.words;
  }

  static createFromJSON(
    data: T_RootUpperConfinedConstructorParametersJSON
  ): RootUpperConfined {
    const words = data.words.map((w) => WordUpperConfined.createFromJSON(w));
    return new RootUpperConfined({ ...data, words });
  }

  getWords(): ReadonlyArray<WordUpperConfined> {
    return this.words;
  }
}
