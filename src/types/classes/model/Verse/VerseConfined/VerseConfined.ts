import { T_VerseConstructorParametersJSON } from "../Verse/Verse";
import {
  T_VerseBaseConstructorParameters,
  VerseBase,
} from "../VerseBase/VerseBase";

export type T_VerseConfinedConstructorParameters =
  T_VerseBaseConstructorParameters;
export type T_VerseConfinedConstructorParametersJSON =
  T_VerseConstructorParametersJSON;

export abstract class VerseConfined extends VerseBase {
  constructor(data: T_VerseConfinedConstructorParameters) {
    super({ ...data });
  }
}
