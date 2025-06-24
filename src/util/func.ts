import { T_ScriptureCode } from "@/types/types";
import { ScripturesDetails } from "./scriptureDetails";

export const getScriptureIfCodeIsValid = (
  scriptureCode: string | T_ScriptureCode
) => {
  if (!isValidScriptureCode(scriptureCode)) return null;

  return ScripturesDetails[scriptureCode];
};

export const isValidScriptureCode = (code: string): code is T_ScriptureCode =>
  code in ScripturesDetails;
