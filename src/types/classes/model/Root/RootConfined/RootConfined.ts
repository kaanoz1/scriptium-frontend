import {
  T_RootBaseConstructorParametersJSON,
  RootBase,
} from "../RootBase/RootBase";

export type T_RootConfinedConstructorParametersJSON =
  T_RootBaseConstructorParametersJSON;
export type T_RootConfinedConstructorParameters = ConstructorParameters<
  typeof RootBase
>[0];

export abstract class RootConfined extends RootBase {
  constructor(data: T_RootConfinedConstructorParameters) {
    super({ ...data });
  }
}
