import { T_SystemLanguageCode } from "@/types/types";
import {
  T_ScriptureSimpleConstructorParameters,
  T_ScriptureSimpleConstructorParametersJSON,
  ScriptureSimple,
} from "../ScriptureSimple/ScriptureSimple";
import { ScriptureMeaning } from "../Util/ScriptureMeaning/ScriptureMeaning";

export type T_ScriptureConstructorParameters =
  T_ScriptureSimpleConstructorParameters;
export type T_ScriptureConstructorParametersJSON =
  T_ScriptureSimpleConstructorParametersJSON;

export class Scripture extends ScriptureSimple {
  constructor(data: T_ScriptureSimpleConstructorParameters) {
    super({ ...data });
  }

  static createFromJSON(data: T_ScriptureConstructorParametersJSON): Scripture {
    const meanings = data.meanings.map(ScriptureMeaning.createFromJSON);
    return new Scripture({ ...data, meanings });
  }

  getMeaningTextOrDefault(langCode: T_SystemLanguageCode): string {
    return (
      this.getMeanings()
        .find((t) => t.getLanguage().getLangCode() == langCode)
        ?.getText() ?? "Unknown Scripture"
    );
  }
}
