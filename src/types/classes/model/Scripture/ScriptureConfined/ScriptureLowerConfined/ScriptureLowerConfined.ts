import { T_SectionLowerConstructorParametersJSON } from "../../../Section/Section/SectionLower/SectionLower";
import { SectionLowerConfined } from "../../../Section/SectionConfined/SectionLowerConfined/SectionLowerConfined";
import {
  T_ScriptureConfinedConstructorParameters,
  T_ScriptureConfinedConstructorParametersJSON,
  ScriptureConfined,
} from "../ScriptureConfined";

export type T_ScriptureLowerConfinedConstructorParameters =
  T_ScriptureConfinedConstructorParameters & {
    sections: ReadonlyArray<SectionLowerConfined>;
  };
export type T_ScriptureLowerConfinedConstructorParametersJSON =
  T_ScriptureConfinedConstructorParametersJSON & {
    sections: ReadonlyArray<T_SectionLowerConstructorParametersJSON>;
  };

export class ScriptureLowerConfined extends ScriptureConfined {
  private readonly sections: ReadonlyArray<SectionLowerConfined>;

  constructor(data: T_ScriptureLowerConfinedConstructorParameters) {
    super({ ...data });
    this.sections = data.sections;
  }

  static createFromJSON(
    data: T_ScriptureLowerConfinedConstructorParametersJSON
  ): ScriptureLowerConfined {
    const sections = data.sections.map(SectionLowerConfined.createFromJSON);
    return new ScriptureLowerConfined({ ...data, sections });
  }

  getSections(): ReadonlyArray<SectionLowerConfined> {
    return this.sections;
  }
}
