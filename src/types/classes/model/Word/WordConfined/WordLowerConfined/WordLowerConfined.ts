import {
  RootLowerConfined,
  T_RootLowerConfinedConstructorParametersJSON,
} from "../../../Root/RootConfined/RootLowerConfined/RootLowerConfined";
import {
  T_WordConfinedConstructorParameters,
  T_WordConfinedConstructorParametersJSON,
  WordConfined,
} from "../WordConfined";

export type T_WordLowerConfinedConstructorParameters =
  T_WordConfinedConstructorParameters & {
    roots: Array<RootLowerConfined>;
  };
export type T_WordLowerConfinedConstructorParametersJSON =
  T_WordConfinedConstructorParametersJSON & {
    roots: Array<T_RootLowerConfinedConstructorParametersJSON>;
  };

export class WordLowerConfined extends WordConfined {
  private readonly roots: ReadonlyArray<RootLowerConfined>;

  constructor(data: T_WordLowerConfinedConstructorParameters) {
    super({ ...data });
    this.roots = data.roots;
  }

  static createFromJSON(
    data: T_WordLowerConfinedConstructorParametersJSON
  ): WordLowerConfined {
    const roots = data.roots.map((r) => RootLowerConfined.createFromJSON(r));
    return new WordLowerConfined({ ...data, roots });
  }

  getRoots(): ReadonlyArray<RootLowerConfined> {
    return Object.freeze([...this.roots]);
  }
}
