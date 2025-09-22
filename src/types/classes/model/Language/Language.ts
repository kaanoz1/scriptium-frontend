import { T_SystemLanguageCode } from "@/types/types";

export type T_LanguageConstructorParams = {
  langCode: T_SystemLanguageCode;
  langOwn: string;
  langEnglish: string;
};

export type T_LanguageConstructorParamsJSON = T_LanguageConstructorParams;

export class Language {
  private readonly langCode: T_SystemLanguageCode;
  private readonly langOwn: string;
  private readonly langEnglish: string;

  constructor(data: T_LanguageConstructorParams) {
    this.langCode = data.langCode;
    this.langOwn = data.langOwn;
    this.langEnglish = data.langEnglish;
  }

  static createFromJSON(data: T_LanguageConstructorParamsJSON): Language {
    return new Language({ ...data });
  }

  getLangCode(): string {
    return this.langCode;
  }

  getLangOwn(): string {
    return this.langOwn;
  }

  getLangEnglish(): string {
    return this.langEnglish;
  }

  static createFromParams(data: T_LanguageConstructorParamsJSON): Language {
    return new Language({ ...data });
  }
}
