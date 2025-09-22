import {
  Language,
  T_LanguageConstructorParams,
} from "../../model/Language/Language";

export type T_MeaningConstructorParameters = {
  text: string;
  language: Language;
};
export type T_MeaningConstructorParametersJSON = {
  text: string;
  language: T_LanguageConstructorParams;
};

export class Meaning {
  protected readonly text: string;
  protected readonly language: Readonly<Language>;

  constructor(data: T_MeaningConstructorParameters) {
    this.text = data.text;
    this.language = data.language;
  }

  static createFromJSON(data: T_MeaningConstructorParametersJSON): Meaning {
    const language = Language.createFromParams(data.language);
    return new Meaning({ ...data, language });
  }

  getText(): string {
    return this.text;
  }

  getLanguage(): Readonly<Language> {
    return this.language;
  }
}
