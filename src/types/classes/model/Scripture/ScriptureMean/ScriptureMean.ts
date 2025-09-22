import { T_SystemLanguageCode } from "@/types/types";
import {
  T_ScriptureBaseConstructorParameters,
  T_ScriptureBaseConstructorParametersJSON,
  ScriptureBase,
} from "../ScriptureBase/ScriptureBase";
import {
  ScriptureMeaning,
  T_ScriptureMeaningConstructorParametersJSON,
} from "../Util/ScriptureMeaning/ScriptureMeaning";

export type T_ScriptureMeanConstructorParameters =
  T_ScriptureBaseConstructorParameters & {
    meanings: Array<ScriptureMeaning>;
  };
export type T_ScriptureMeanConstructorParametersJSON =
  T_ScriptureBaseConstructorParametersJSON & {
    meanings: Array<T_ScriptureMeaningConstructorParametersJSON>;
  };

export class ScriptureMean extends ScriptureBase {
  private readonly meanings: Array<ScriptureMeaning>;

  constructor(data: T_ScriptureMeanConstructorParameters) {
    super({ ...data });
    this.meanings = data.meanings;
  }

  static createFromJSON(
    data: T_ScriptureMeanConstructorParametersJSON
  ): ScriptureMean {
    const meanings = data.meanings.map(ScriptureMeaning.createFromJSON);
    return new ScriptureMean({ ...data, meanings });
  }

  getMeaningTextOrDefault(langCode: T_SystemLanguageCode): string {
    return (
      this.getMeanings()
        .find((t) => t.getLanguage().getLangCode() == langCode)
        ?.getText() ?? "Unknown Scripture"
    );
  }

  getMeanings(): ReadonlyArray<ScriptureMeaning> {
    return Object.freeze([...this.meanings]);
  }
}
