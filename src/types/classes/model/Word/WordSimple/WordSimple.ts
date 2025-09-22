import {
  T_VocalizationConstructorParametersJSON,
  Vocalization,
} from "../../Verse/Util/Vocalization";
import {
  WordMeaning,
  T_WordMeaningConstructorParametersJSON,
} from "../Util/WordMeaning/WordMeaning";
import {
  T_WordBaseConstructorParameters,
  T_WordBaseConstructorParametersJSON,
  WordBase,
} from "../WordBase/WordBase";

export type T_WordSimpleConstructorParameters =
  T_WordBaseConstructorParameters & {
    variation: Vocalization;
    meanings: Array<WordMeaning>;
  };
export type T_WordSimpleConstructorParametersJSON =
  T_WordBaseConstructorParametersJSON & {
    variation: T_VocalizationConstructorParametersJSON;
    meanings: Array<T_WordMeaningConstructorParametersJSON>;
  };

export abstract class WordSimple extends WordBase {
  protected readonly variation: Readonly<Vocalization>;
  protected readonly meanings: ReadonlyArray<WordMeaning>;

  constructor(data: T_WordSimpleConstructorParameters) {
    super({ ...data });
    this.variation = data.variation;
    this.meanings = data.meanings;
  }

  getVariation(): Readonly<Vocalization> {
    return Object.freeze(this.variation);
  }

  getMeanings(): ReadonlyArray<WordMeaning> {
    return Object.freeze([...this.meanings]);
  }
}
