import { T_OriginalScriptureVocalizationKey } from "@/types/types";

export class VocalizationSymbols {
  private readonly usual: string;
  private readonly simplified: string;
  private readonly withoutVowel: string;

  constructor(data: T_TextVariationSymbolsConstructorParameters) {
    this.usual = data.usual;
    this.simplified = data.simplified;
    this.withoutVowel = data.withoutVowel;
  }

  static createFromJSON(
    data: T_TextVariationSymbolsConstructorParametersJSON
  ): VocalizationSymbols {
    return new VocalizationSymbols({ ...data });
  }

  getUsual(): string {
    return this.usual;
  }

  getSimplified(): string {
    return this.simplified;
  }

  getWithoutVowel(): string {
    return this.withoutVowel;
  }

  getTextWithVariation(key: T_OriginalScriptureVocalizationKey): string {
    return this[key];
  }
}

export type T_TextVariationSymbolsConstructorParameters = {
  usual: string;
  simplified: string;
  withoutVowel: string;
};
export type T_TextVariationSymbolsConstructorParametersJSON =
  T_TextVariationSymbolsConstructorParameters;
