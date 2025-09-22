import {
  T_ScriptureBaseConstructorParameters,
  T_ScriptureBaseConstructorParametersJSON,
  ScriptureBase,
} from "../ScriptureBase/ScriptureBase";

export type T_ScriptureConfinedConstructorParameters =
  T_ScriptureBaseConstructorParameters;
export type T_ScriptureConfinedConstructorParametersJSON =
  T_ScriptureBaseConstructorParametersJSON;

export abstract class ScriptureConfined extends ScriptureBase {
  constructor(data: T_ScriptureConfinedConstructorParameters) {
    super({ ...data });
  }
}
