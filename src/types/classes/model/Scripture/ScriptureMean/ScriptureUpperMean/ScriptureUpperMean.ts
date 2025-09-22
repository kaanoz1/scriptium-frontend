import { ScriptureMeaning } from "../../Util/ScriptureMeaning/ScriptureMeaning";
import {
  T_ScriptureMeanConstructorParameters,
  T_ScriptureMeanConstructorParametersJSON,
  ScriptureMean,
} from "../ScriptureMean";

export type T_ScriptureUpperMeanConstructorParameters =
  T_ScriptureMeanConstructorParameters;
export type T_ScriptureUpperMeanConstructorParametersJSON =
  T_ScriptureMeanConstructorParametersJSON;

export class ScriptureUpperMean extends ScriptureMean {
  constructor(data: T_ScriptureUpperMeanConstructorParameters) {
    super({ ...data });
  }

  static override createFromJSON(
    data: T_ScriptureUpperMeanConstructorParametersJSON
  ): ScriptureUpperMean {
    const meanings = data.meanings.map(ScriptureMeaning.createFromJSON);
    return new ScriptureUpperMean({ ...data, meanings });
  }
}
