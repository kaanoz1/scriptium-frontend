export class LanguageDTO {
  constructor(
    private readonly langCode: string,
    private readonly langOwn: string,
    private readonly langEnglish: string
  ) {}

  getLangCode(): string {
    return this.langCode;
  }

  getLangOwn(): string {
    return this.langOwn;
  }

  getLangEnglish(): string {
    return this.langEnglish;
  }
}

export abstract class Meaning {
  constructor(
    protected readonly text: string,
    protected readonly language: Readonly<LanguageDTO>
  ) {}

  getText(): string {
    return this.text;
  }

  getLanguage(): Readonly<LanguageDTO> {
    return this.language;
  }
}
