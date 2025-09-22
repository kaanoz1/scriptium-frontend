export type T_SectionBaseConstructorParameters = {
  id: number;
  name: string;
  number: number;
};
export type T_SectionBaseConstructorParametersJSON =
  T_SectionBaseConstructorParameters;

export abstract class SectionBase {
  protected readonly id: number;
  protected readonly name: string;
  protected readonly number: number;

  constructor(data: T_SectionBaseConstructorParameters) {
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
