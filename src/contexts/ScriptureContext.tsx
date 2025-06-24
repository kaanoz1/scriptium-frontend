import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { T_ScriptureCode } from "@/types/types";
import { ScripturePreference } from "@/types/classes/Scripture";
import { VerseOptions } from "@/types/classes/Verse";
import { getScriptureIfCodeIsValid } from "@/util/func";

type ScripturePreferencesMap = Record<T_ScriptureCode, ScripturePreference>;

type ScriptureProviderContextType = {
  preferences: ScripturePreferencesMap;
  setPreferences: Dispatch<SetStateAction<ScripturePreferencesMap>>;
};

const ScriptureProviderContext =
  createContext<ScriptureProviderContextType | null>(null);

const createDefaultPreferencesObjects = (): ScripturePreferencesMap => {
  const t = getScriptureIfCodeIsValid("t");
  if (!t) throw new Error("Scripture object not found.");

  return {
    t: new ScripturePreference(
      t.getCode(),
      t.getDefaultTranslationFont(),
      t.getDefaultTranslationId(),
      new VerseOptions(true, true, true, false, "usual")
    ),
  };
};

export const ScriptureProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<ScripturePreferencesMap>(
    createDefaultPreferencesObjects()
  );

  return (
    <ScriptureProviderContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </ScriptureProviderContext.Provider>
  );
};

export default ScriptureProviderContext;
