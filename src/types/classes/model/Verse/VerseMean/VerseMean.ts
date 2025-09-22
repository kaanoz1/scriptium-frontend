import { Vocalization } from "../Util/Vocalization";
import {
  T_VerseBaseConstructorParameters,
  T_VerseBaseConstructorParametersJSON,
  VerseBase,
} from "../VerseBase/VerseBase";

export type T_VerseMeanConstructorParameters = T_VerseBaseConstructorParameters;
export type T_VerseMeanConstructorParametersJSON =
  T_VerseBaseConstructorParametersJSON;

export class VerseMean extends VerseBase {
  constructor(data: T_VerseMeanConstructorParameters) {
    super({ ...data });
  }

  static createFromJSON(data: T_VerseMeanConstructorParametersJSON): VerseMean {
    const variation = Vocalization.createFromJSON(data.variation);
    return new VerseMean({ ...data, variation });
  }
}
