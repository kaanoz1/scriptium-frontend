import {
  T_WordUpperConstructorParametersJSON,
  WordUpper,
} from "../../Word/Word/WordUpper/WordUpper";
import {
  T_RootConstructorParametersJSON,
  T_RootConstructorParameters,
  Root,
} from "../Root/Root";

export type T_RootUpperConstructorParametersJSON =
  T_RootConstructorParametersJSON & {
    words: Array<T_WordUpperConstructorParametersJSON>;
  };
export type T_RootUpperConstructorParameters = T_RootConstructorParameters & {
  words: Array<WordUpper>;
};

export class RootUpper extends Root {
  private readonly words: ReadonlyArray<WordUpper>;

  constructor(data: T_RootUpperConstructorParameters) {
    super({ ...data });
    this.words = data.words;
  }

  static override createFromJSON(
    data: T_RootUpperConstructorParametersJSON
  ): RootUpper {
    const words: Array<WordUpper> = data.words.map((w) =>
      WordUpper.createFromJSON(w)
    );
    return new RootUpper({ ...data, words });
  }

  getWords(): ReadonlyArray<WordUpper> {
    return this.words;
  }
}
