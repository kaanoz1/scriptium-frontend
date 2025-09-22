import { Meaning } from "@/types/classes/util/Meaning/Meaning";
import { T_RootConstructorParametersJSON, Root } from "../../../Root/Root/Root";
import {
  T_WordConstructorParameters,
  T_WordConstructorParametersJSON,
  Word,
} from "../Word";
import { Vocalization } from "../../../Verse/Util/Vocalization";

export type T_WordLowerConstructorParameters = T_WordConstructorParameters & {
  roots: Array<Root>;
};
export type T_WordLowerConstructorParametersJSON =
  T_WordConstructorParametersJSON & {
    roots: Array<T_RootConstructorParametersJSON>;
  };

export class WordLower extends Word {
  private readonly roots: ReadonlyArray<Root>;

  constructor(data: T_WordLowerConstructorParameters) {
    super({ ...data });
    this.roots = data.roots;
  }

  static override createFromJSON(
    data: T_WordLowerConstructorParametersJSON
  ): WordLower {
    const roots = data.roots.map((r) => Root.createFromJSON(r));
    const variation = Vocalization.createFromJSON(data.variation);
    const meanings = data.meanings.map((m) => Meaning.createFromJSON(m));
    return new WordLower({ ...data, roots, variation, meanings });
  }

  getRoots(): ReadonlyArray<Root> {
    return Object.freeze([...this.roots]);
  }
}
