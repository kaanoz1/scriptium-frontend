import {
  T_RootConfinedConstructorParametersJSON,
  T_RootConfinedConstructorParameters,
  RootConfined,
} from "../RootConfined";

export type T_RootLowerConfinedConstructorParametersJSON =
  T_RootConfinedConstructorParametersJSON;
export type T_RootLowerConfinedConstructorParameters =
  T_RootConfinedConstructorParameters;

export class RootLowerConfined extends RootConfined {
  constructor(data: T_RootLowerConfinedConstructorParameters) {
    super({ ...data });
  }

  static createFromJSON(data: T_RootLowerConfinedConstructorParametersJSON) {
    return new RootLowerConfined({ ...data });
  }
}
