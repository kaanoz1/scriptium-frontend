import {
  Section,
  T_SectionConstructorParametersJSON,
} from "../../../Section/Section/Section";
import {
  T_ScriptureConstructorParameters,
  T_ScriptureConstructorParametersJSON,
  Scripture,
} from "../../Scripture/Scripture";
import { ScriptureMeaning } from "../../Util/ScriptureMeaning/ScriptureMeaning";

export type T_ScriptureOneLevelLowerConstructorParameters =
  T_ScriptureConstructorParameters & {
    sections: Array<Section>;
  };
export type T_ScriptureOneLevelLowerConstructorParametersJSON =
  T_ScriptureConstructorParametersJSON & {
    sections: Array<T_SectionConstructorParametersJSON>;
  };

export class ScriptureOneLevelLower extends Scripture {
  private readonly sections: ReadonlyArray<Section>;

  constructor(data: T_ScriptureOneLevelLowerConstructorParameters) {
    super({ ...data });
    this.sections = data.sections;
  }

  static override createFromJSON(
    data: T_ScriptureOneLevelLowerConstructorParametersJSON
  ): ScriptureOneLevelLower {
    const sections = data.sections.map(Section.createFromJSON);
    const meanings = data.meanings.map(ScriptureMeaning.createFromJSON);
    return new ScriptureOneLevelLower({ ...data, sections, meanings });
  }

  getSections(): ReadonlyArray<Section> {
    return this.sections;
  }
}
