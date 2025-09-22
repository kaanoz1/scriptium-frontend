import {
  T_ScriptureConfinedConstructorParameters,
  T_ScriptureConfinedConstructorParametersJSON,
  ScriptureConfined,
} from "../ScriptureConfined";

export type T_ScriptureUpperConfinedConstructorParameters =
  T_ScriptureConfinedConstructorParameters;
export type T_ScriptureUpperConfinedConstructorParametersJSON =
  T_ScriptureConfinedConstructorParametersJSON;

export class ScriptureUpperConfined extends ScriptureConfined {
  constructor(data: T_ScriptureUpperConfinedConstructorParameters) {
    super({ ...data });
  }

  static createFromJSON(
    data: T_ScriptureUpperConfinedConstructorParametersJSON
  ): ScriptureUpperConfined {
    return new ScriptureUpperConfined({ ...data });
  }
}
