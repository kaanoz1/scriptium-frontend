import { ScriptureDetails } from "@/types/classes/Scripture";
import {
  T_ScriptureTextVariationKey,
  T_ValidScriptureCode,
} from "@/types/types";
import { ValidScriptures } from "@/util/utils";
import {
  createContext,
  Dispatch,
  Key,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface T_ScripturePreference {
  preferredTranslationIdSingle: Set<Key>;
  preferredTranslationIdsMultiple: Set<Key>;
  preferredScriptureFont: string;
  preferredScriptureVerseTextVariation: T_ScriptureTextVariationKey;
}

export interface T_PreferredScriptureSettings {
  readonly preferencesByScripture: {
    [K in T_ValidScriptureCode]: T_ScripturePreference;
  };

  getDefaultTranslationIdSingle(key: T_ValidScriptureCode): number;
}

type ScriptureObjectContextType = {
  preferredScriptureContext: T_PreferredScriptureSettings;
  setPreferredScriptureContext: Dispatch<
    SetStateAction<T_PreferredScriptureSettings>
  >;
};

const ScriptureProviderContext = createContext<
  ScriptureObjectContextType | undefined
>(undefined);

const createScriptureObject = (): T_PreferredScriptureSettings => {
  const scriptureObject = {
    preferencesByScripture: {} as {
      [K in T_ValidScriptureCode]: T_ScripturePreference;
    },
    getDefaultTranslationIdSingle: (key: T_ValidScriptureCode) =>
      Array.from(
        scriptureObject.preferencesByScripture[key].preferredTranslationIdSingle
      )[0] as number,
  };

  for (const code of Object.keys(ValidScriptures) as T_ValidScriptureCode[]) {
    const scripture: Readonly<ScriptureDetails> = ValidScriptures[code];
    const defaultTranslationId = scripture.getDefaultTranslationId();
    const defaultScriptureFont = scripture.getDefaultTranslationFont();

    scriptureObject.preferencesByScripture[code] = {
      preferredTranslationIdSingle: new Set([defaultTranslationId.toString()]),
      preferredTranslationIdsMultiple: new Set([
        defaultTranslationId.toString(),
      ]),
      preferredScriptureVerseTextVariation: "usual",
      preferredScriptureFont: defaultScriptureFont,
    };
  }

  return scriptureObject;
};

export const ScriptureProvider = ({ children }: { children: ReactNode }) => {
  const [preferredScriptureContext, setPreferredScriptureContext] =
    useState<T_PreferredScriptureSettings>(createScriptureObject());

  return (
    <ScriptureProviderContext.Provider
      value={{ preferredScriptureContext, setPreferredScriptureContext }}
    >
      {children}
    </ScriptureProviderContext.Provider>
  );
};

export default ScriptureProviderContext;
