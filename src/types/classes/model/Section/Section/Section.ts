import { T_SystemLanguageCode } from "@/types/types";
import {
  T_SectionSimpleConstructorParameters,
  T_SectionSimpleConstructorParametersJSON,
  SectionSimple,
} from "../SectionSimple/SectionSimple";
import { SectionMeaning } from "../Util/SectionMeaning/SectionMeaning";

export type T_SectionConstructorParameters =
  T_SectionSimpleConstructorParameters;
export type T_SectionConstructorParametersJSON =
  T_SectionSimpleConstructorParametersJSON;

export class Section extends SectionSimple {
  constructor(data: T_SectionConstructorParameters) {
    super({ ...data });
  }

  static createFromJSON(data: T_SectionConstructorParametersJSON): Section {
    const meanings = data.meanings.map(SectionMeaning.createFromJSON);
    return new Section({ ...data, meanings });
  }

  getMeaningTextOrDefault(langCode: T_SystemLanguageCode): string {
    return (
      this.getMeanings()
        .find((t) => t.getLanguage().getLangCode() == langCode)
        ?.getText() ?? "Unknown Section"
    );
  }
}
