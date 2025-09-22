import { T_SystemLanguageCode } from "@/types/types";
import {
  T_SectionBaseConstructorParameters,
  T_SectionBaseConstructorParametersJSON,
  SectionBase,
} from "../SectionBase/SectionBase";
import {
  SectionMeaning,
  T_SectionMeaningConstructorParametersJSON,
} from "../Util/SectionMeaning/SectionMeaning";

export type T_SectionMeanConstructorParameters =
  T_SectionBaseConstructorParameters & {
    meanings: Array<SectionMeaning>;
  };
export type T_SectionMeanConstructorParametersJSON =
  T_SectionBaseConstructorParametersJSON & {
    meanings: Array<T_SectionMeaningConstructorParametersJSON>;
  };

export class SectionMean extends SectionBase {
  private readonly meanings: ReadonlyArray<SectionMeaning> = [];

  constructor(data: T_SectionMeanConstructorParameters) {
    super({ ...data });
    this.meanings = data.meanings;
  }

  static createFromJSON(
    data: T_SectionMeanConstructorParametersJSON
  ): SectionMean {
    const meanings = data.meanings.map(SectionMeaning.createFromJSON);
    return new SectionMean({ ...data, meanings });
  }

  getMeanings(): ReadonlyArray<SectionMeaning> {
    return Object.freeze([...this.meanings]);
  }

  getMeaningTextOrDefault(langCode: T_SystemLanguageCode): string {
    return (
      this.getMeanings()
        .find((t) => t.getLanguage().getLangCode() == langCode)
        ?.getText() ?? "Unknown Section"
    );
  }
}
