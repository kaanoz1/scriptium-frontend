import { VerseUpperConfined } from "../Verse/VerseConfined/VerseUpperConfined/VerseUpperConfined";
import {
  VerseUpperMean,
  T_VerseUpperMeanConstructorParametersJSON,
} from "../Verse/VerseMean/VerseUpperMean/VerseUpperMean";
import {
  TranslationText,
  T_TranslationTextConstructorParametersJSON,
} from "./TranslationText/TranslationText";

export class TranslationTextWithVerseUpperConfined {
  constructor(
    private readonly translationText: TranslationText,
    private readonly verse: Readonly<VerseUpperConfined>
  ) {}

  getTranslationText(): Readonly<TranslationText> {
    return Object.freeze(this.translationText);
  }

  getVerse(): Readonly<VerseUpperConfined> {
    return Object.freeze(this.verse);
  }
}

export type T_TranslationTextWithVerseUpperMeanConstructorParameters = {
  translationText: TranslationText;
  verse: VerseUpperMean;
};

export type T_TranslationTextWithVerseUpperMeanConstructorParametersJSON = {
  translationText: T_TranslationTextConstructorParametersJSON;
  verse: T_VerseUpperMeanConstructorParametersJSON;
};

export class TranslationTextWithVerseUpperMean {
  private readonly translationText: TranslationText;
  private readonly verse: Readonly<VerseUpperMean>;
  constructor(data: T_TranslationTextWithVerseUpperMeanConstructorParameters) {
    this.translationText = data.translationText;
    this.verse = data.verse;
  }

  getTranslationText(): Readonly<TranslationText> {
    return Object.freeze(this.translationText);
  }

  static createFromJSON(
    data: T_TranslationTextWithVerseUpperMeanConstructorParametersJSON
  ) {
    const translationText = TranslationText.createFromJSON(
      data.translationText
    );
    const verse = VerseUpperMean.createFromJSON(data.verse);
    return new TranslationTextWithVerseUpperMean({
      ...data,
      verse,
      translationText,
    });
  }

  getVerse(): Readonly<VerseUpperMean> {
    return Object.freeze(this.verse);
  }
}
