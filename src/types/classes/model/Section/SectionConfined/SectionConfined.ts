import { T_SectionBaseConstructorParameters, T_SectionBaseConstructorParametersJSON, SectionBase } from "../SectionBase/SectionBase";

export type T_SectionConfinedConstructorParameters =
  T_SectionBaseConstructorParameters;
export type T_SectionConfinedConstructorParametersJSON =
  T_SectionBaseConstructorParametersJSON;

export abstract class SectionConfined extends SectionBase {
  constructor(data: T_SectionConfinedConstructorParameters) {
    super({ ...data });
  }
}
