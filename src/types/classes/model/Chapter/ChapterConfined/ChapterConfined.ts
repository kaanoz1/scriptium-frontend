import {
  T_ChapterBaseConstructorParameters,
  T_ChapterBaseConstructorParametersJSON,
  ChapterBase,
} from "../ChapterBase/ChapterBase";

export type T_ChapterConfined = T_ChapterBaseConstructorParameters;

export type T_ChapterConfinedJSON = T_ChapterBaseConstructorParametersJSON;

export abstract class ChapterConfined extends ChapterBase {
  constructor(data: T_ChapterConfined) {
    super({ ...data });
  }
}
