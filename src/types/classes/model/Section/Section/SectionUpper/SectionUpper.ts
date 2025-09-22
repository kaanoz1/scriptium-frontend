import {
  Scripture,
  T_ScriptureConstructorParametersJSON,
} from "../../../Scripture/Scripture/Scripture";
import { SectionMeaning } from "../../Util/SectionMeaning/SectionMeaning";
import {
  T_SectionConstructorParameters,
  T_SectionConstructorParametersJSON,
  Section,
} from "../Section";

export type T_SectionUpperConstructorParameters =
  T_SectionConstructorParameters & { scripture: Scripture };
export type T_SectionUpperConstructorParametersJSON =
  T_SectionConstructorParametersJSON & {
    scripture: T_ScriptureConstructorParametersJSON;
  };

export class SectionUpper extends Section {
  private readonly scripture: Scripture;

  constructor(data: T_SectionUpperConstructorParameters) {
    super({ ...data });
    this.scripture = data.scripture;
  }

  static override createFromJSON(
    data: T_SectionUpperConstructorParametersJSON
  ): SectionUpper {
    const scripture = Scripture.createFromJSON(data.scripture);
    const meanings = data.meanings.map(SectionMeaning.createFromJSON);
    return new SectionUpper({ ...data, scripture, meanings });
  }

  getScripture(): Readonly<Scripture> {
    return this.scripture;
  }
}
