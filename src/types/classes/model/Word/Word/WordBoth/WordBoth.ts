import { Meaning } from "@/types/classes/util/Meaning/Meaning";
import { T_RootConstructorParametersJSON, Root } from "../../../Root/Root/Root";
import {
  Verse,
  T_VerseConstructorParametersJSON,
} from "../../../Verse/Verse/Verse";
import {
  T_WordConstructorParameters,
  T_WordConstructorParametersJSON,
  Word,
} from "../Word";
import { Vocalization } from "../../../Verse/Util/Vocalization";

export type T_WordBothConstructorParameters = T_WordConstructorParameters & {
  verse: Verse;
  roots: Array<Root>;
};
export type T_WordBothConstructorParametersJSON =
  T_WordConstructorParametersJSON & {
    verse: T_VerseConstructorParametersJSON;
    roots: Array<T_RootConstructorParametersJSON>;
  };

export class WordBoth extends Word {
  private readonly verse: Readonly<Verse>;
  private readonly roots: ReadonlyArray<Root>;

  constructor(data: T_WordBothConstructorParameters) {
    super({ ...data });
    this.verse = data.verse;
    this.roots = data.roots;
  }

  static override createFromJSON(
    data: T_WordBothConstructorParametersJSON
  ): WordBoth {
    const roots = data.roots.map((r) => Root.createFromJSON(r));
    const variation = Vocalization.createFromJSON(data.variation);
    const meanings = data.meanings.map((m) => Meaning.createFromJSON(m));
    const verse = Verse.createFromJSON(data.verse);
    return new WordBoth({ ...data, roots, meanings, variation, verse });
  }

  getVerse(): Readonly<Verse> {
    return Object.freeze(this.verse);
  }

  getRoots(): ReadonlyArray<Root> {
    return Object.freeze([...this.roots]);
  }
}
