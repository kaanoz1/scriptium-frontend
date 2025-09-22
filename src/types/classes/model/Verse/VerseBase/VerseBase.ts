import {
  T_VocalizationConstructorParametersJSON,
  Vocalization,
} from "../Util/Vocalization";

export type T_VerseBaseConstructorParameters = {
  id: number;
  number: number;
  variation: Vocalization;
};

export type T_VerseBaseConstructorParametersJSON = {
  id: number;
  number: number;
  variation: T_VocalizationConstructorParametersJSON;
};

export abstract class VerseBase {
  protected readonly id: number;
  protected readonly number: number;
  protected readonly variation: Vocalization;

  constructor(data: T_VerseBaseConstructorParameters) {
    this.id = data.id;
    this.number = data.number;
    this.variation = data.variation;
  }

  getId(): number {
    return this.id;
  }

  getNumber(): number {
    return this.number;
  }

  getVocalization(): Readonly<Vocalization> {
    return this.variation;
  }
}
