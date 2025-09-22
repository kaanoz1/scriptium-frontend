import {
  SectionLower,
  T_SectionLowerConstructorParametersJSON,
} from "../../Section/Section/SectionLower/SectionLower";
import {
  T_ScriptureConstructorParameters,
  T_ScriptureConstructorParametersJSON,
  Scripture,
} from "../Scripture/Scripture";
import { ScriptureMeaning } from "../Util/ScriptureMeaning/ScriptureMeaning";

export type T_ScriptureLowerConstructorParameters =
  T_ScriptureConstructorParameters & {
    sections: Array<SectionLower>;
  };
export type T_ScriptureLowerConstructorParametersJSON =
  T_ScriptureConstructorParametersJSON & {
    sections: Array<T_SectionLowerConstructorParametersJSON>;
  };

export class ScriptureLower extends Scripture {
  private readonly sections: Array<SectionLower>;

  constructor(data: T_ScriptureLowerConstructorParameters) {
    super({ ...data });

    this.sections = data.sections;
  }

  static override createFromJSON(
    data: T_ScriptureLowerConstructorParametersJSON
  ): ScriptureLower {
    const sections = data.sections.map(SectionLower.createFromJSON);
    const meanings = data.meanings.map(ScriptureMeaning.createFromJSON);
    return new ScriptureLower({ ...data, sections, meanings });
  }

  getSections(): ReadonlyArray<SectionLower> {
    return this.sections;
  }
}
