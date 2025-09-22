import {
  T_RootConstructorParametersJSON,
  T_RootConstructorParameters,
  Root,
} from "../Root/Root";

export type T_RootLowerConstructorParametersJSON =
  T_RootConstructorParametersJSON;
export type T_RootLowerConstructorParameters = T_RootConstructorParameters;

export class RootLower extends Root {
  constructor(data: T_RootLowerConstructorParameters) {
    super({ ...data });
  }

  static override createFromJSON(
    data: T_RootLowerConstructorParametersJSON
  ): RootLower {
    return new RootLower({ ...data });
  }
}
