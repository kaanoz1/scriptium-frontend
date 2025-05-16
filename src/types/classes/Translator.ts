import { LanguageDTO } from "./Language";

export class TranslatorDTO {
  constructor(
    private readonly name: string,
    private readonly language: Readonly<LanguageDTO>,
    private readonly url: string | null = null
  ) {}

  getName(): string {
    return this.name;
  }

  getLanguage(): Readonly<LanguageDTO> {
    return Object.freeze(this.language);
  }

  getUrl(): string | null {
    return this.url;
  }
}
