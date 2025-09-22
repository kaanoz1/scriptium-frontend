import {
  ScriptureUpperMean,
  T_ScriptureUpperMeanConstructorParametersJSON,
} from "../../../Scripture/ScriptureMean/ScriptureUpperMean/ScriptureUpperMean";
import { SectionMeaning } from "../../Util/SectionMeaning/SectionMeaning";
import {
  T_SectionMeanConstructorParameters,
  T_SectionMeanConstructorParametersJSON,
  SectionMean,
} from "../SectionMean";

export type T_SectionUpperMeanConstructorParameters =
  T_SectionMeanConstructorParameters & {
    scripture: ScriptureUpperMean;
  };
export type T_SectionUpperMeanConstructorParametersJSON =
  T_SectionMeanConstructorParametersJSON & {
    scripture: T_ScriptureUpperMeanConstructorParametersJSON;
  };

export class SectionUpperMean extends SectionMean {
  private readonly scripture: ScriptureUpperMean;

  constructor(data: T_SectionUpperMeanConstructorParameters) {
    super({ ...data });
    this.scripture = data.scripture;
  }

  static override createFromJSON(
    data: T_SectionUpperMeanConstructorParametersJSON
  ): SectionUpperMean {
    const scripture = ScriptureUpperMean.createFromJSON(data.scripture);
    const meanings = data.meanings.map(SectionMeaning.createFromJSON);
    return new SectionUpperMean({ ...data, scripture, meanings });
  }

  getScripture(): Readonly<ScriptureUpperMean> {
    return Object.freeze(this.scripture);
  }
}
