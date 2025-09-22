import { T_SectionLowerConstructorParametersJSON } from "../../../Section/Section/SectionLower/SectionLower";
import { SectionLowerMean } from "../../../Section/SectionMean/SectionLowerMean/SectionLowerMean";
import { ScriptureMeaning } from "../../Util/ScriptureMeaning/ScriptureMeaning";
import {
  T_ScriptureMeanConstructorParameters,
  T_ScriptureMeanConstructorParametersJSON,
  ScriptureMean,
} from "../ScriptureMean";

export type T_ScriptureLowerMeanConstructorParameters =
  T_ScriptureMeanConstructorParameters & {
    sections: Array<SectionLowerMean>;
  };
export type T_ScriptureLowerMeanConstructorParametersJSON =
  T_ScriptureMeanConstructorParametersJSON & {
    sections: Array<T_SectionLowerConstructorParametersJSON>;
  };

export class ScriptureLowerMean extends ScriptureMean {
  private readonly sections: Array<SectionLowerMean>;

  constructor(data: T_ScriptureLowerMeanConstructorParameters) {
    super({ ...data });
    this.sections = data.sections;
  }

  static override createFromJSON(
    data: T_ScriptureLowerMeanConstructorParametersJSON
  ): ScriptureLowerMean {
    const sections = data.sections.map(SectionLowerMean.createFromJSON);
    const meanings = data.meanings.map(ScriptureMeaning.createFromJSON);
    return new ScriptureLowerMean({ ...data, sections, meanings });
  }

  getSections(): ReadonlyArray<SectionLowerMean> {
    return Object.freeze([...this.sections]);
  }
}
