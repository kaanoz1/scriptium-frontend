import {
  T_ScriptureBaseConstructorParameters,
  ScriptureBase,
} from "../ScriptureBase/ScriptureBase";
import {
  ScriptureMeaning,
  T_ScriptureMeaningConstructorParametersJSON,
} from "../Util/ScriptureMeaning/ScriptureMeaning";

export type T_ScriptureSimpleConstructorParameters =
  T_ScriptureBaseConstructorParameters & {
    meanings: Array<ScriptureMeaning>;
  };
export type T_ScriptureSimpleConstructorParametersJSON =
  T_ScriptureBaseConstructorParameters & {
    meanings: Array<T_ScriptureMeaningConstructorParametersJSON>;
  };

export abstract class ScriptureSimple extends ScriptureBase {
  protected readonly meanings: Array<ScriptureMeaning>;

  constructor(data: T_ScriptureSimpleConstructorParameters) {
    super({ ...data });
    this.meanings = data.meanings;
  }

  getMeanings(): ReadonlyArray<ScriptureMeaning> {
    return this.meanings;
  }
}
