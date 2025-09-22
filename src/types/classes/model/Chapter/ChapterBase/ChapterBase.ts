export type T_ChapterBaseConstructorParameters = {
  id: number;
  name: string;
  number: number;
};

export type T_ChapterBaseConstructorParametersJSON =
  T_ChapterBaseConstructorParameters;

export abstract class ChapterBase {
  protected readonly id: number;
  protected readonly name: string;
  protected readonly number: number;

  public constructor(data: T_ChapterBaseConstructorParameters) {
    this.id = data.id;
    this.name = data.name;
    this.number = data.number;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getNumber(): number {
    return this.number;
  }
}
