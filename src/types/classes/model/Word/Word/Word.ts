import { Meaning } from "@/types/classes/util/Meaning/Meaning";
import {
  T_WordSimpleConstructorParameters,
  T_WordSimpleConstructorParametersJSON,
  WordSimple,
} from "../WordSimple/WordSimple";
import { Vocalization } from "../../Verse/Util/Vocalization";
import { T_OriginalScriptureVocalizationKey } from "@/types/types";

export type T_WordConstructorParameters = T_WordSimpleConstructorParameters;
export type T_WordConstructorParametersJSON =
  T_WordSimpleConstructorParametersJSON;

export class Word extends WordSimple {
  constructor(data: T_WordConstructorParameters) {
    super({ ...data });
  }

  getTextOfVariationOrUsual(variation: T_OriginalScriptureVocalizationKey) {
    return (
      this.getVariation().getTextWithVariation(variation) ??
      this.getVariation().getUsual()
    );
  }

  static createFromJSON(data: T_WordConstructorParametersJSON): Word {
    const variation = Vocalization.createFromJSON(data.variation);
    const meanings = data.meanings.map((m) => Meaning.createFromJSON(m));
    return new Word({ ...data, meanings, variation });
  }
}
