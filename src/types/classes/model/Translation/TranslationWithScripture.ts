import { Language } from "../Language/Language";
import {
  Scripture,
  T_ScriptureConstructorParametersJSON,
} from "../Scripture/Scripture/Scripture";
import { Translator } from "../Translator/Translator";
import {
  T_TranslationConstructorParameters,
  T_TranslationConstructorParametersJSON,
  Translation,
} from "./Translation/Translation";

export type T_TranslationWithScriptureConstructorParameters =
  T_TranslationConstructorParameters & {
    scripture: Scripture;
  };

export type T_TranslationWithScriptureConstructorParametersJSON =
  T_TranslationConstructorParametersJSON & {
    scripture: T_ScriptureConstructorParametersJSON;
  };

export class TranslationWithScripture extends Translation {
  private readonly scripture: Readonly<Scripture>;

  constructor(data: T_TranslationWithScriptureConstructorParameters) {
    super({ ...data });
    this.scripture = data.scripture;
  }

  static override createFromJSON(
    data: T_TranslationWithScriptureConstructorParametersJSON
  ): TranslationWithScripture {
    const scripture = Scripture.createFromJSON(data.scripture);
    const language = Language.createFromJSON(data.language);
    const translators = data.translators.map(Translator.createFromJSON);
    return new TranslationWithScripture({
      ...data,
      scripture,
      language,
      translators,
    });
  }

  getScripture(): Readonly<Scripture> {
    return this.scripture;
  }
}
