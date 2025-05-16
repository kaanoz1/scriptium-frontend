import { LanguageDTO } from "./Language";

export class TransliterationDTO {
  constructor(
    private readonly transliteration: string,
    private readonly language: Readonly<LanguageDTO>
  ) {}

  getTransliteration(): string {
    return this.transliteration;
  }

  getLanguage(): Readonly<LanguageDTO> {
    return Object.freeze(this.language);
  }
}
