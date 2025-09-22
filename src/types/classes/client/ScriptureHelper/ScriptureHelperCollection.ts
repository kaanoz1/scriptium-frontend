import { T_ScriptureCode } from "@/types/types";
import {
  ScriptureHelper,
  TorahHelper,
} from "../Scripture/ScriptureHelper/ScriptureHelper";

export class ScriptureHelperCollection {
  private readonly _scriptureHelpers: Record<
    T_ScriptureCode,
    Readonly<ScriptureHelper>
  >; //Record is more type-safe and better in more aspect, so I choose Record rather than Map()

  constructor() {
    this._scriptureHelpers = {
      t: new TorahHelper(),
    } as const;
  }

  getScriptureHelper(scriptureCode: T_ScriptureCode) {
    return this._scriptureHelpers[scriptureCode];
  }

  isCodeValid(scriptureCode: string): scriptureCode is T_ScriptureCode {
    return scriptureCode in this._scriptureHelpers;
  }

  getScriptureHelperIfExist(scriptureCode: string) {
    
    const codeCandidate = scriptureCode;

    if(this.isCodeValid(codeCandidate)) return this._scriptureHelpers[codeCandidate];
    else return undefined;

  
  }
}
