import {
  Language,
  T_LanguageConstructorParamsJSON,
} from "../../Language/Language";
import {
  Translator,
  T_TranslatorConstructorParametersJSON,
} from "../../Translator/Translator";

export type T_TranslationConstructorParameters = {
  id: number;
  name: string;
  language: Language;
  translators: Array<Translator>;
  isEager: boolean;
};
export type T_TranslationConstructorParametersJSON = {
  id: number;
  name: string;
  language: T_LanguageConstructorParamsJSON;
  translators: Array<T_TranslatorConstructorParametersJSON>;
  isEager: boolean;
};

export class Translation {
  private readonly id: number;
  private readonly name: string;
  private readonly language: Readonly<Language>;
  private readonly translators: ReadonlyArray<Translator>;
  private readonly isEager: boolean;

  constructor(data: T_TranslationConstructorParameters) {
    this.id = data.id;
    this.name = data.name;
    this.language = data.language;
    this.translators = data.translators;
    this.isEager = data.isEager;
  }

  static createFromJSON(
    data: T_TranslationConstructorParametersJSON
  ): Translation {
    const language = Language.createFromJSON(data.language);
    const translators = data.translators.map(Translator.createFromJSON);
    return new Translation({ ...data, language, translators });
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getLanguage(): Readonly<Language> {
    return this.language;
  }

  getTranslators(): ReadonlyArray<Translator> {
    return this.translators;
  }

  getIsEager(): boolean {
    return this.isEager;
  }
}
