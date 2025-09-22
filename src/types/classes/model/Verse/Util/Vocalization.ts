import { T_OriginalScriptureVocalizationKey } from "@/types/types";

export type T_VocalizationConstructorParameters = {
  usual: string;
  simplified: string | null;
  withoutVowel: string | null;
};
export type T_VocalizationConstructorParametersJSON =
  T_VocalizationConstructorParameters;

export class Vocalization {
  private readonly usual: string;
  private readonly simplified: string | null;
  private readonly withoutVowel: string | null;

  constructor(data: T_VocalizationConstructorParameters) {
    this.usual = data.usual;
    this.simplified = data.simplified;
    this.withoutVowel = data.withoutVowel;
  }

  static createFromJSON(
    data: T_VocalizationConstructorParametersJSON
  ): Vocalization {
    return new Vocalization({ ...data });
  }

  getUsual(): string {
    return this.usual;
  }

  getSimplified(): string | null {
    return this.simplified;
  }

  getWithoutVowel(): string | null {
    return this.withoutVowel;
  }

  getTextWithVariation(key: T_OriginalScriptureVocalizationKey): string | null {
    return this[key];
  }
}
