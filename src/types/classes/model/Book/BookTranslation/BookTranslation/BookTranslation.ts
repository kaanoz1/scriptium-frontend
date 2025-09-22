import {
  Language,
  T_LanguageConstructorParamsJSON,
} from "../../../Language/Language";
import {
  Translator,
  T_TranslatorConstructorParametersJSON,
} from "../../../Translator/Translator";

export type T_BookTranslationConstructorParameters = {
  id: number;
  name: string;
  language: Language;
  translators: Array<Translator>;
};

export type T_BookTranslationConstructorParametersJSON = {
  id: number;
  name: string;
  language: T_LanguageConstructorParamsJSON;
  translators: Array<T_TranslatorConstructorParametersJSON>;
};

export class BookTranslation {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _language: Readonly<Language>;
  private readonly _translators: ReadonlyArray<Translator>;

  constructor(data: T_BookTranslationConstructorParameters) {
    const { id, name, language, translators } = data;

    this._id = id;
    this._name = name;
    this._language = language;
    this._translators = translators;
  }

  getId() {
    return this._id;
  }

  getName() {
    return this._name;
  }

  getLanguage() {
    return this._language;
  }

  getTranslators() {
    return this._translators;
  }

  static createFromJSON(data: T_BookTranslationConstructorParametersJSON) {
    const language = Language.createFromJSON(data.language);
    const translators = data.translators.map(Translator.createFromJSON);
    return new BookTranslation({ ...data, language, translators });
  }
}
