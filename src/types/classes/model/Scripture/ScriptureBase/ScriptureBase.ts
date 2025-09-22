import { T_ScriptureCode } from "@/types/types";

export type T_ScriptureBaseConstructorParameters = {
  id: number;
  name: string;
  number: number;
  code: T_ScriptureCode;
};
export type T_ScriptureBaseConstructorParametersJSON =
  T_ScriptureBaseConstructorParameters;

export abstract class ScriptureBase {
  protected readonly id: number;
  protected readonly name: string;
  protected readonly number: number;
  protected readonly code: T_ScriptureCode;

  protected constructor(data: T_ScriptureBaseConstructorParameters) {
    this.id = data.id;
    this.name = data.name;
    this.number = data.number;
    this.code = data.code;
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

  getCode(): T_ScriptureCode {
    return this.code;
  }
}
