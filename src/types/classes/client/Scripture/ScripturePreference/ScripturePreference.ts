import {
  T_OriginalScriptureTextFont,
  T_OriginalScriptureVocalizationKey,
  T_ScriptureCode,
} from "@/types/types";
import { VerseOptions } from "../../Verse/VerseOptions/VerseOptions";
import { Key } from "react";
import { ScriptureHelperCollection } from "../../ScriptureHelper/ScriptureHelperCollection";

export type T_ScripturePreference = {
  preferredFont: T_OriginalScriptureTextFont;
  preferredTranslationId: number;
  preferredTranslationIdMultiple: Set<number>;
  preferredOriginalTextVariationKey: T_OriginalScriptureVocalizationKey;
};

export class ScripturePreference {
  private readonly code: T_ScriptureCode;
  private preferredFont: T_OriginalScriptureTextFont;
  private preferredTranslationId: number;
  private preferredTranslationIdMultiple: Set<number>;
  private options: VerseOptions;

  constructor(
    code: T_ScriptureCode,
    preferredFont: T_OriginalScriptureTextFont,
    preferredTranslationId: number,
    options: VerseOptions
  ) {
    this.code = code;
    this.preferredFont = preferredFont;
    this.preferredTranslationId = preferredTranslationId;
    this.preferredTranslationIdMultiple = new Set<number>([
      preferredTranslationId,
    ]);
    this.options = options;
  }

  private clone(): ScripturePreference {
    const cloned = new ScripturePreference(
      this.code,
      this.preferredFont,
      this.preferredTranslationId,
      this.options
    );
    cloned.setPreferredTranslationIdMultiple(
      this.preferredTranslationIdMultiple
    );
    return cloned;
  }

  getCode(): T_ScriptureCode {
    return this.code;
  }

  getOptions(): VerseOptions {
    return this.options;
  }

  getPreferredFont(): T_OriginalScriptureTextFont {
    return this.preferredFont;
  }

  getPreferredTranslationId(): number {
    return this.preferredTranslationId;
  }

  getPreferredTranslationIdMultiple(): Set<number> {
    return this.preferredTranslationIdMultiple;
  }

  getPreferredOriginalScriptureTextVariationKey(): T_OriginalScriptureVocalizationKey {
    return this.getOptions().getVariation();
  }

  setPreferredTranslationId(preferredTranslationId: Key) {
    try {
      const parsed: number = Number(preferredTranslationId);
      this.preferredTranslationId = parsed;
    } catch (error: unknown) {
      console.error(error);
      this.preferredTranslationId = new ScriptureHelperCollection()
        .getScriptureHelper(this.code)
        .getDefaultTranslationId();
    }
  }

  setPreferredTranslationIdMultiple(preferredTranslationIdMultiple: Set<Key>) {
    try {
      const parsedArray: number[] = Array.from(preferredTranslationIdMultiple)

        .map((e) => {
          const num = Number(e);
          if (Number.isNaN(num)) {
            throw new Error(
              `Some values are unexpected. value: ${e} typeof e: ${typeof e}`
            );
          }
          return num;
        })
        .filter((e) => e > 0);

      this.preferredTranslationIdMultiple = new Set<number>(parsedArray);
    } catch (error: unknown) {
      console.error(error);
      const preferredTranslationIdSingle = new ScriptureHelperCollection()
        .getScriptureHelper(this.getCode())
        .getDefaultTranslationId();
      this.preferredTranslationIdMultiple = new Set<number>([
        preferredTranslationIdSingle,
      ]);
    }
  }

  setPreferredFont(font: T_OriginalScriptureTextFont) {
    this.preferredFont = font; //TODO: Add code check here
  }

  setOptions(options: VerseOptions) {
    this.options = options;
  }

  setPreferredTranslationIdAndGetClone(preferredTranslationId: Key) {
    this.setPreferredTranslationId(preferredTranslationId);
    return this.clone();
  }

  setPreferredTranslationIdMultipleAndGetClone(
    preferredTranslationIdMultiple: Set<Key>
  ) {
    this.setPreferredTranslationIdMultiple(preferredTranslationIdMultiple);
    return this.clone();
  }

  setPreferredFontAndGetClone(font: T_OriginalScriptureTextFont) {
    this.setPreferredFont(font);
    return this.clone();
  }

  setOptionsAndClone(options: VerseOptions): ScripturePreference {
    this.setOptions(options);
    return this.clone();
  }
}
