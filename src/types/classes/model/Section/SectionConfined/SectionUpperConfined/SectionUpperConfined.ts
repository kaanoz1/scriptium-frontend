import {
  ScriptureUpperConfined,
  T_ScriptureUpperConfinedConstructorParametersJSON,
} from "../../../Scripture/ScriptureConfined/ScriptureUpperConfined/ScriptureUpperConfined";
import {
  T_SectionConfinedConstructorParameters,
  T_SectionConfinedConstructorParametersJSON,
  SectionConfined,
} from "../SectionConfined";

export type T_SectionUpperConfinedConstructorParameters =
  T_SectionConfinedConstructorParameters & {
    scripture: ScriptureUpperConfined;
  };

export type T_SectionUpperConfinedConstructorParametersJSON =
  T_SectionConfinedConstructorParametersJSON & {
    scripture: T_ScriptureUpperConfinedConstructorParametersJSON;
  };

export class SectionUpperConfined extends SectionConfined {
  private readonly scripture: ScriptureUpperConfined;

  constructor(data: T_SectionUpperConfinedConstructorParameters) {
    super({ ...data });
    this.scripture = data.scripture;
  }

  static createFromJSON(
    data: T_SectionUpperConfinedConstructorParametersJSON
  ): SectionUpperConfined {
    const scripture = ScriptureUpperConfined.createFromJSON(data.scripture);
    return new SectionUpperConfined({ ...data, scripture });
  }

  getScripture(): Readonly<ScriptureUpperConfined> {
    return this.scripture;
  }
}
