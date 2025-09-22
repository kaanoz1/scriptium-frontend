import {
  Language,
  T_LanguageConstructorParamsJSON,
} from "../Language/Language";

export type T_TransliterationConstructorParameters = {
  transliteration: string;
  language: Language;
};

export type T_TransliterationConstructorParametersJSON = {
  transliteration: string;
  language: T_LanguageConstructorParamsJSON;
};

export class Transliteration {
  private readonly transliteration: string;
  private readonly language: Readonly<Language>;

  constructor(data: T_TransliterationConstructorParameters) {
    this.transliteration = data.transliteration;
    this.language = data.language;
  }

  static createFromJSON(
    data: T_TransliterationConstructorParametersJSON
  ): Transliteration {
    const language = Language.createFromJSON(data.language);
    return new Transliteration({ ...data, language });
  }

  getTransliteration(): string {
    return this.transliteration;
  }

  getLanguage(): Readonly<Language> {
    return Object.freeze(this.language);
  }
}
