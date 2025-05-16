import { T_ScriptureTextVariationKey } from "../types";
import {
  ChapterUpperDTO,
  ChapterDTO,
  ChapterUpperConfinedDTO,
  ChapterUpperMeanDTO,
} from "./Chapter";
import { TranslationTextDTO } from "./TranslationText";
import { TransliterationDTO } from "./Transliteration";
import { WordDTO, WordLowerDTO, WordLowerConfinedDTO } from "./Word";

export class TextVariationDTO {
  constructor(
    private readonly usual: string,
    private readonly simplified: string | null,
    private readonly withoutVowel: string | null
  ) {}

  getUsual(): string {
    return this.usual;
  }

  getSimplified(): string | null {
    return this.simplified;
  }

  getWithoutVowel(): string | null {
    return this.withoutVowel;
  }

  getTextWithVariation(key: T_ScriptureTextVariationKey): string | null {
    return this[key];
  }
}
export abstract class VerseBaseDTO {
  constructor(
    protected readonly id: number,
    protected readonly number: number,
    protected readonly variation: Readonly<TextVariationDTO>
  ) {}

  getId(): number {
    return this.id;
  }

  getNumber(): number {
    return this.number;
  }

  getTextVarition(): Readonly<TextVariationDTO> {
    return this.variation;
  }
}

export abstract class VerseSimpleDTO extends VerseBaseDTO {
  constructor(
    id: number,
    number: number,
    variation: Readonly<TextVariationDTO>,
    protected readonly transliterations: ReadonlyArray<TransliterationDTO> = [],
    protected readonly translationTexts: ReadonlyArray<TranslationTextDTO> = [],
    protected readonly isSaved: boolean = false
  ) {
    super(id, number, variation);
  }

  getVariation(): Readonly<TextVariationDTO> {
    return Object.freeze(this.variation);
  }

  getTransliterations(): ReadonlyArray<TransliterationDTO> {
    return Object.freeze([...this.transliterations]);
  }

  getTranslationTexts(): ReadonlyArray<TranslationTextDTO> {
    return Object.freeze([...this.translationTexts]);
  }

  getIsSaved(): boolean {
    return this.isSaved;
  }
}
export class VerseDTO extends VerseSimpleDTO {}

export class VerseUpperDTO extends VerseDTO {
  constructor(
    id: number,
    number: number,
    variation: Readonly<TextVariationDTO>,
    transliterations: ReadonlyArray<TransliterationDTO>,
    translationTexts: ReadonlyArray<TranslationTextDTO>,
    isSaved: boolean,
    private readonly chapter: Readonly<ChapterUpperDTO>
  ) {
    super(id, number, variation, transliterations, translationTexts, isSaved);
  }

  getChapter(): Readonly<ChapterUpperDTO> {
    return Object.freeze(this.chapter);
  }
}

export class VerseOneLevelUpperDTO extends VerseDTO {
  constructor(
    id: number,
    number: number,
    variation: Readonly<TextVariationDTO>,
    transliterations: ReadonlyArray<TransliterationDTO>,
    translationTexts: ReadonlyArray<TranslationTextDTO>,
    isSaved: boolean,
    private readonly chapter: Readonly<ChapterDTO>
  ) {
    super(id, number, variation, transliterations, translationTexts, isSaved);
  }

  getChapter(): Readonly<ChapterDTO> {
    return Object.freeze(this.chapter);
  }
}

export class VerseOneLevelLowerDTO extends VerseDTO {
  constructor(
    id: number,
    number: number,
    variation: Readonly<TextVariationDTO>,
    transliterations: ReadonlyArray<TransliterationDTO>,
    translationTexts: ReadonlyArray<TranslationTextDTO>,
    isSaved: boolean,
    private readonly words: ReadonlyArray<WordDTO>
  ) {
    super(id, number, variation, transliterations, translationTexts, isSaved);
  }

  getWords(): ReadonlyArray<WordDTO> {
    return Object.freeze([...this.words]);
  }
}

export class VerseLowerDTO extends VerseDTO {
  constructor(
    id: number,
    number: number,
    variation: Readonly<TextVariationDTO>,
    transliterations: ReadonlyArray<TransliterationDTO>,
    translationTexts: ReadonlyArray<TranslationTextDTO>,
    isSaved: boolean,
    private readonly words: ReadonlyArray<WordLowerDTO>
  ) {
    super(id, number, variation, transliterations, translationTexts, isSaved);
  }

  getWords(): ReadonlyArray<WordLowerDTO> {
    return Object.freeze([...this.words]);
  }
}

export class VerseBothDTO extends VerseDTO {
  constructor(
    id: number,
    number: number,
    variation: Readonly<TextVariationDTO>,
    transliterations: ReadonlyArray<TransliterationDTO>,
    translationTexts: ReadonlyArray<TranslationTextDTO>,
    isSaved: boolean,
    private readonly chapter: Readonly<ChapterUpperDTO>,
    private readonly words: ReadonlyArray<WordLowerDTO>
  ) {
    super(id, number, variation, transliterations, translationTexts, isSaved);
  }

  getChapter(): Readonly<ChapterUpperDTO> {
    return Object.freeze(this.chapter);
  }

  getWords(): ReadonlyArray<WordLowerDTO> {
    return Object.freeze([...this.words]);
  }
}

export abstract class VerseConfinedDTO extends VerseBaseDTO {
  constructor(id: number, number: number, variation: TextVariationDTO) {
    super(id, number, variation);
  }
}

export class VerseUpperConfinedDTO extends VerseConfinedDTO {
  constructor(
    id: number,
    number: number,
    variation: TextVariationDTO,
    private readonly chapter: Readonly<ChapterUpperConfinedDTO>
  ) {
    super(id, number, variation);
  }

  getChapter(): Readonly<ChapterUpperConfinedDTO> {
    return Object.freeze(this.chapter);
  }
}

export class VerseLowerConfinedDTO extends VerseConfinedDTO {
  constructor(
    id: number,
    number: number,
    variation: TextVariationDTO,
    private readonly words: ReadonlyArray<WordLowerConfinedDTO>
  ) {
    super(id, number, variation);
  }

  getWords(): ReadonlyArray<WordLowerConfinedDTO> {
    return Object.freeze([...this.words]);
  }
}

export class VerseTranslationTextPair {
  constructor(
    private readonly _verse: VerseUpperDTO,
    private readonly _translationText: TranslationTextDTO
  ) {}

  getVerse(): Readonly<VerseUpperDTO> {
    return this._verse;
  }

  getTranslationText(): Readonly<TranslationTextDTO> {
    return this._translationText;
  }
}

export class VerseMeanDTO extends VerseBaseDTO {}

export class VerseUpperMeanDTO extends VerseMeanDTO {
  constructor(
    id: number,
    number: number,
    variation: TextVariationDTO,
    private readonly chapter: Readonly<ChapterUpperMeanDTO>
  ) {
    super(id, number, variation);
  }

  getChapter(): Readonly<ChapterUpperMeanDTO> {
    return Object.freeze(this.chapter);
  }
}

export class VerseLowerMeanDTO extends VerseMeanDTO {
  // No additional fields
}
