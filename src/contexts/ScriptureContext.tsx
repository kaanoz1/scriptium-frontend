"use client";

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { T_ScriptureCode } from "@/types/types";
import { ScripturePreference } from "@/types/classes/client/Scripture/ScripturePreference/ScripturePreference";
import { VerseOptions } from "@/types/classes/client/Verse/VerseOptions/VerseOptions";
import { ScriptureHelperCollection } from "@/types/classes/client/ScriptureHelper/ScriptureHelperCollection";

type ScripturePreferencesMap = Record<T_ScriptureCode, ScripturePreference>;

type ScriptureProviderContextType = {
  preferences: ScripturePreferencesMap;
  setPreferences: Dispatch<SetStateAction<ScripturePreferencesMap>>;
};

const ScriptureProviderContext =
  createContext<ScriptureProviderContextType | null>(null);

const createDefaultPreferencesObjects = (): ScripturePreferencesMap => {
  const t = new ScriptureHelperCollection().getScriptureHelper("t");
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
