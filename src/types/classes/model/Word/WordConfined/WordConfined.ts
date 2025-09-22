import {
  T_WordBaseConstructorParameters,
  T_WordBaseConstructorParametersJSON,
  WordBase,
} from "../WordBase/WordBase";

export type T_WordConfinedConstructorParameters =
  T_WordBaseConstructorParameters;
export type T_WordConfinedConstructorParametersJSON =
  T_WordBaseConstructorParametersJSON;

export abstract class WordConfined extends WordBase {
  constructor(data: T_WordConfinedConstructorParameters) {
    super({ ...data });
  }
}
