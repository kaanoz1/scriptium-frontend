export type T_WordBaseConstructorParameters = {
  id: number;
  sequenceNumber: number;
};
export type T_WordBaseConstructorParametersJSON =
  T_WordBaseConstructorParameters;

export abstract class WordBase {
  protected readonly id: number;
  protected readonly sequenceNumber: number;

  constructor(data: T_WordBaseConstructorParameters) {
    this.id = data.id;
    this.sequenceNumber = data.sequenceNumber;
  }

  getId(): number {
    return this.id;
  }

  getSequenceNumber(): number {
    return this.sequenceNumber;
  }
}
