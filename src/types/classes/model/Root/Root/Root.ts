import {
  T_RootBaseConstructorParameters,
  T_RootBaseConstructorParametersJSON,
  RootBase,
} from "../RootBase/RootBase";

export type T_RootConstructorParameters = T_RootBaseConstructorParameters;
export type T_RootConstructorParametersJSON =
  T_RootBaseConstructorParametersJSON;

export class Root extends RootBase {
  constructor(data: T_RootConstructorParameters) {
    super({ ...data });
  }

  static createFromJSON(data: T_RootConstructorParametersJSON): Root {
    return new Root(data);
  }
}
