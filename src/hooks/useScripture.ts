import { Key, useContext } from "react";
import {
  T_OriginalScriptureTextFont,
  T_OriginalScriptureTextVariationKey,
  T_ScriptureCode,
} from "@/types/types";
import ScriptureProviderContext from "@/contexts/ScriptureContext";

export const useScripturePreferences = (code?: T_ScriptureCode) => {
  const context = useContext(ScriptureProviderContext);
  if (!context) throw new Error("Scripture context not found");
  if (!code) throw new Error("Code not provided");

  const { preferences, setPreferences } = context;
  const preference = preferences[code];

  const setFont = (font: T_OriginalScriptureTextFont) => {
    setPreferences((prev) => ({
      ...prev,
      [code]: prev[code].setPreferredFontAndGetClone(font),
    }));
  };

  const setTranslationId = (id: Key) => {
    setPreferences((prev) => ({
      ...prev,
      [code]: prev[code].setPreferredTranslationIdAndGetClone(id),
    }));
  };

  const setTranslationIdMultiple = (set: Set<Key>) => {
    setPreferences((prev) => ({
      ...prev,
      [code]: prev[code].setPreferredTranslationIdMultipleAndGetClone(set),
    }));
  };

  const setShowTranslations = (boolean: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [code]: prev[code].setOptionsAndClone(
        prev[code].getOptions().setShowTranslationAndGetClone(boolean)
      ),
    }));
  };

  const setShowTransliterations = (boolean: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [code]: prev[code].setOptionsAndClone(
        prev[code].getOptions().setShowTransliterationAndGetClone(boolean)
      ),
    }));
  };

  const setShowOriginalText = (boolean: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [code]: prev[code].setOptionsAndClone(
        prev[code].getOptions().setShowOriginalTextAndGetClone(boolean)
      ),
    }));
  };

  const setShowFootnotes = (boolean: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [code]: prev[code].setOptionsAndClone(
        prev[code].getOptions().setShowFootnotesAndGetClone(boolean)
      ),
    }));
  };

  const setOriginalTextVariation = (
    variation: T_OriginalScriptureTextVariationKey
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [code]: prev[code].setOptionsAndClone(
        prev[code].getOptions().setVariationAndGetClone(variation)
      ),
    }));
  };

  return {
    preference,
    setFont,
    setTranslationId,
    setTranslationIdMultiple,
    setShowTranslations,
    setShowTransliterations,
    setShowOriginalText,
    setShowFootnotes,
    setOriginalTextVariation,
  };
};
