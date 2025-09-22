import { T_OriginalScriptureVocalizationKey } from "@/types/types";

export class VerseOptions {
  private showFootnotes: boolean;
  private showTranslation: boolean;
  private showTransliteration: boolean;
  private showOriginalText: boolean;
  private variation: T_OriginalScriptureVocalizationKey;

  constructor(
    showFootnotes: boolean,
    showTranslation: boolean,
    showOriginalText: boolean,
    showTransliteration: boolean,
    variation: T_OriginalScriptureVocalizationKey
  ) {
    this.showFootnotes = showFootnotes;
    this.showTranslation = showTranslation;
    this.showOriginalText = showOriginalText;
    this.variation = variation;
    this.showTransliteration = showTransliteration;
  }

  getClone(): VerseOptions {
    return new VerseOptions(
      this.getShowFootnotes(),
      this.getShowTranslation(),
      this.getShowOriginalText(),
      this.getShowTransliteration(),
      this.getVariation()
    );
  }

  getShowFootnotes(): boolean {
    return this.showFootnotes;
  }

  getShowTranslation(): boolean {
    return this.showTranslation;
  }

  getShowOriginalText(): boolean {
    return this.showOriginalText;
  }
  getShowTransliteration(): boolean {
    return this.showTransliteration;
  }

  getVariation(): T_OriginalScriptureVocalizationKey {
    return this.variation;
  }

  setShowTranslation(boolean: boolean): void {
    this.showTranslation = boolean;
  }

  setShowTransliteration(boolean: boolean): void {
    this.showTransliteration = boolean;
  }

  setShowOriginalText(boolean: boolean): void {
    this.showOriginalText = boolean;
  }

  setShowFootnotes(boolean: boolean): void {
    this.showFootnotes = boolean;
  }

  setVariation(variation: T_OriginalScriptureVocalizationKey): void {
    this.variation = variation;
  }

  setShowTranslationAndGetClone(boolean: boolean): VerseOptions {
    this.setShowTranslation(boolean);
    return this.getClone();
  }

  setShowTransliterationAndGetClone(boolean: boolean): VerseOptions {
    this.setShowTransliteration(boolean);
    return this.getClone();
  }

  setShowOriginalTextAndGetClone(boolean: boolean): VerseOptions {
    this.setShowOriginalText(boolean);
    return this.getClone();
  }

  setShowFootnotesAndGetClone(boolean: boolean): VerseOptions {
    this.setShowFootnotes(boolean);
    return this.getClone();
  }

  setVariationAndGetClone(
    variation: T_OriginalScriptureVocalizationKey
  ): VerseOptions {
    this.setVariation(variation);
    return this.getClone();
  }
}
