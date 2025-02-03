import { AvailableScriptureKey, VerseTextVariation } from "@/types/types";
import { AvailableScriptures } from "@/util/utils";
import {
  createContext,
  Dispatch,
  Key,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type ScriptureObject = {
  -readonly [K in AvailableScriptureKey]: {
    preferredTranslationIdSingle: Set<Key>;
    preferredTranslationIdsMultiple: Set<Key>;
    preferredScriptureFont: string;
    preferredScriptureVerseTextVariation: VerseTextVariation;
  };
};

type ScriptureObjectContextType = {
  preferredScriptureContext: ScriptureObject;
  setPreferredScriptureContext: Dispatch<SetStateAction<ScriptureObject>>;
};

const ScriptureProviderContext = createContext<
  ScriptureObjectContextType | undefined
>(undefined);

const createScriptureObject = (): ScriptureObject => {
  const scriptureObject = {} as ScriptureObject;

  for (const code of Object.keys(
    AvailableScriptures
  ) as Array<AvailableScriptureKey>) {
    const { defaultTranslationId, defaultScriptureFont } =
      AvailableScriptures[code];

    scriptureObject[code] = {
      preferredTranslationIdSingle: new Set([defaultTranslationId.toString()]),
      preferredTranslationIdsMultiple: new Set([defaultTranslationId.toString()]),
      preferredScriptureVerseTextVariation: "text",
      preferredScriptureFont: defaultScriptureFont,
    };
  }

  return scriptureObject;
};

export const ScriptureProvider = ({ children }: { children: ReactNode }) => {
  const [preferredScriptureContext, setPreferredScriptureContext] =
    useState<ScriptureObject>(createScriptureObject());

  return (
    <ScriptureProviderContext.Provider
      value={{ preferredScriptureContext, setPreferredScriptureContext }}
    >
      {children}
    </ScriptureProviderContext.Provider>
  );
};

export default ScriptureProviderContext;
