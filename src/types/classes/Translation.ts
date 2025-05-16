import { LanguageDTO } from "./Language";
import { ScriptureDTO } from "./Scripture";
import { TranslatorDTO } from "./Translator";

export class TranslationDTO {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly language: Readonly<LanguageDTO>,
    private readonly translators: ReadonlyArray<TranslatorDTO>,
    private readonly isEager: boolean
  ) {}

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getLanguage(): Readonly<LanguageDTO> {
    return this.language;
  }

  getTranslators(): ReadonlyArray<TranslatorDTO> {
    return this.translators;
  }

  getIsEager(): boolean {
    return this.isEager;
  }
}

export class TranslationWithScriptureDTODTO extends TranslationDTO {
  constructor(
    id: number,
    name: string,
    language: Readonly<LanguageDTO>,
    translators: ReadonlyArray<TranslatorDTO>,
    isEager: boolean,
    private readonly scripture: Readonly<ScriptureDTO>
  ) {
    super(id, name, language, translators, isEager);
  }

  getScripture(): Readonly<ScriptureDTO> {
    return this.scripture;
  }
}
