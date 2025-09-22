import {
  T_OriginalScriptureVocalizationKey,
  T_SystemLanguageCode,
} from "@/types/types";
import {
  TranslationText,
  T_TranslationTextConstructorParametersJSON,
} from "../../TranslationText/TranslationText/TranslationText";
import {
  Transliteration,
  T_TransliterationConstructorParametersJSON,
} from "../../Transliteration/Transliteration";
import {
  T_VerseBaseConstructorParameters,
  T_VerseBaseConstructorParametersJSON,
  VerseBase,
} from "../VerseBase/VerseBase";
import { Vocalization } from "../Util/Vocalization";
import { Translation } from "../../Translation/Translation/Translation";

export type T_VerseSimpleConstructorParameters =
  T_VerseBaseConstructorParameters & {
    transliterations: Array<Transliteration>;
    translationTexts: Array<TranslationText>;
    isSaved: boolean;
  };
export type T_VerseSimpleConstructorParametersJSON =
  T_VerseBaseConstructorParametersJSON & {
    transliterations: Array<T_TransliterationConstructorParametersJSON>;
    translationTexts: Array<T_TranslationTextConstructorParametersJSON>;
    isSaved: boolean;
  };

export abstract class VerseSimple extends VerseBase {
  protected readonly _transliterations: ReadonlyArray<Transliteration>;
  protected readonly _translationTexts: ReadonlyArray<TranslationText>;
  protected readonly _isSaved: boolean;

  constructor(data: T_VerseSimpleConstructorParameters) {
    super({ ...data });

    this._transliterations = data.transliterations;
    this._translationTexts = data.translationTexts;
    this._isSaved = data.isSaved;
  }

  getVariation(): Readonly<Vocalization> {
    return Object.freeze(this.variation);
  }

  getTransliterations(): ReadonlyArray<Transliteration> {
    return Object.freeze([...this._transliterations]);
  }

  getTextOfVariationOrUsual(variation: T_OriginalScriptureVocalizationKey) {
    return (
      this.getVariation().getTextWithVariation(variation) ??
      this.getVariation().getUsual()
    );
  }

  getTransliterationTextOrNull(langCode: T_SystemLanguageCode): string | null {
    return (
      this.getTransliterations()
        .find((t) => t.getLanguage().getLangCode() == langCode)
        ?.getTransliteration() ?? null
    );
  }

  getTranslationTextOfTranslations(selectedTranslations: Array<Translation>) {
    return this.getTranslationTexts().filter((tt) =>
      selectedTranslations
        .map((t) => t.getId())
        .includes(tt.getTranslation().getId())
    );
  }

  getTranslationTexts(): ReadonlyArray<TranslationText> {
    return Object.freeze([...this._translationTexts]);
  }

  getIsSaved(): boolean {
    return this._isSaved;
  }
}
