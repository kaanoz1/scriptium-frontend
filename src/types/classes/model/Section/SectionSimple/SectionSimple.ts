import {
  T_SectionBaseConstructorParameters,
  T_SectionBaseConstructorParametersJSON,
  SectionBase,
} from "../SectionBase/SectionBase";
import {
  SectionMeaning,
  T_SectionMeaningConstructorParametersJSON,
} from "../Util/SectionMeaning/SectionMeaning";

export type T_SectionSimpleConstructorParameters =
  T_SectionBaseConstructorParameters & {
    meanings: Array<SectionMeaning>;
  };
export type T_SectionSimpleConstructorParametersJSON =
  T_SectionBaseConstructorParametersJSON & {
    meanings: Array<T_SectionMeaningConstructorParametersJSON>;
  };

export abstract class SectionSimple extends SectionBase {
  protected readonly meanings: Array<SectionMeaning>;

  protected constructor(data: T_SectionSimpleConstructorParameters) {
    super({ ...data });
    this.meanings = data.meanings;
  }

  getMeanings(): ReadonlyArray<SectionMeaning> {
    return this.meanings;
  }
}
