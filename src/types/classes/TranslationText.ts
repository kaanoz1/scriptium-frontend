import { FootNoteDTO } from "./FootNote";
import { TranslationDTO } from "./Translation";
import { VerseUpperConfinedDTO, VerseUpperMeanDTO } from "./Verse";

export class TranslationTextDTO {
  constructor(
    private readonly text: string,
    private readonly translation: Readonly<TranslationDTO>,
    private readonly footNotes: ReadonlyArray<FootNoteDTO>
  ) {}

  getText(): string {
    return this.text;
  }

  getTranslation(): Readonly<TranslationDTO> {
    return Object.freeze(this.translation);
  }

  getFootNotes(): ReadonlyArray<FootNoteDTO> {
    return Object.freeze([...this.footNotes]);
  }
}

export class TranslationTextWithVerseUpperConfinedDTO {
  constructor(
    private readonly translationText: TranslationTextDTO,
    private readonly verse: Readonly<VerseUpperConfinedDTO>
  ) {}

  getTranslationText(): Readonly<TranslationTextDTO> {
    return Object.freeze(this.translationText);
  }

  getVerse(): Readonly<VerseUpperConfinedDTO> {
    return Object.freeze(this.verse);
  }
}

export class TranslationTextWithVerseUpperMeanDTO {
  constructor(
    private readonly translationText: TranslationTextDTO,
    private readonly verse: Readonly<VerseUpperMeanDTO>
  ) {}

  getTranslationText(): Readonly<TranslationTextDTO> {
    return Object.freeze(this.translationText);
  }

  getVerse(): Readonly<VerseUpperMeanDTO> {
    return Object.freeze(this.verse);
  }
}
