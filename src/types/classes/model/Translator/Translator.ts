import {
  Language,
  T_LanguageConstructorParamsJSON,
} from "../Language/Language";

export type T_TranslatorConstructorParameters = {
  name: string;
  language: Language;
  url: string | null;
};

export type T_TranslatorConstructorParametersJSON = {
  name: string;
  language: T_LanguageConstructorParamsJSON;
  url: string | null;
};

export class Translator {
  private readonly name: string;
  private readonly language: Readonly<Language>;
  private readonly url: string | null = null;

  constructor(data: T_TranslatorConstructorParameters) {
    this.name = data.name;
    this.language = data.language;
    this.url = data.url;
  }

  static createFromJSON(
    data: T_TranslatorConstructorParametersJSON
  ): Translator {
    const language = Language.createFromJSON(data.language);
    return new Translator({ ...data, language });
  }

  getName(): string {
    return this.name;
  }

  getLanguage(): Readonly<Language> {
    return Object.freeze(this.language);
  }

  getUrl(): string | null {
    return this.url;
  }
}
