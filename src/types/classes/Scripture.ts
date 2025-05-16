import {
  T_ScriptureTextVariationKey,
  T_ValidScriptureCode,
  T_ValidScriptureFont,
} from "../types";
import { Meaning } from "./Language";
import {
  SectionLowerDTO,
  SectionDTO,
  SectionLowerConfinedDTO,
  SectionLowerMeanDTO,
} from "./Section";
import { TextVariationDTO } from "./Verse";

export abstract class ScriptureBaseDTO {
  constructor(
    protected readonly id: number,
    protected readonly name: string,
    protected readonly number: number,
    protected readonly code: T_ValidScriptureCode
  ) {}

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getNumber(): number {
    return this.number;
  }

  getCode(): T_ValidScriptureCode {
    return this.code;
  }
}

export abstract class ScriptureSimpleDTO extends ScriptureBaseDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    code: T_ValidScriptureCode,
    protected readonly meanings: ReadonlyArray<ScriptureMeaningDTO> = []
  ) {
    super(id, name, number, code);
  }

  getMeanings(): ReadonlyArray<ScriptureMeaningDTO> {
    return this.meanings;
  }
}

export class ScriptureDTO extends ScriptureSimpleDTO {
  // No additional fields
}

export class ScriptureLowerDTO extends ScriptureDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    code: T_ValidScriptureCode,
    meanings: ReadonlyArray<ScriptureMeaningDTO> = [],
    private readonly sections: ReadonlyArray<SectionLowerDTO>
  ) {
    super(id, name, number, code, meanings);
  }

  getSections(): ReadonlyArray<SectionLowerDTO> {
    return this.sections;
  }
}

export class ScriptureOneLevelUpperDTO extends ScriptureDTO {
  // Same structure as ScriptureDTO
}

export class ScriptureOneLevelLowerDTO extends ScriptureDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    code: T_ValidScriptureCode,
    meanings: ReadonlyArray<ScriptureMeaningDTO> = [],
    private readonly sections: ReadonlyArray<SectionDTO>
  ) {
    super(id, name, number, code, meanings);
  }

  getSections(): ReadonlyArray<SectionDTO> {
    return this.sections;
  }
}

export class ScriptureMeaningDTO extends Meaning {
  // Inherits from Meaning (which should also be immutable)
}

export abstract class ScriptureConfinedDTO extends ScriptureBaseDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    code: T_ValidScriptureCode
  ) {
    super(id, name, number, code);
  }
}

export class ScriptureUpperConfinedDTO extends ScriptureConfinedDTO {
  // No additional fields
}

export class ScriptureLowerConfinedDTO extends ScriptureConfinedDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    code: T_ValidScriptureCode,
    private readonly sections: ReadonlyArray<SectionLowerConfinedDTO>
  ) {
    super(id, name, number, code);
  }

  getSections(): ReadonlyArray<SectionLowerConfinedDTO> {
    return this.sections;
  }
}

export class TextVariationSymbols {
  constructor(
    private readonly usual: string,
    private readonly simplified: string,
    private readonly withoutVowel: string
  ) {}

  getUsual(): string {
    return this.usual;
  }

  getSimplified(): string {
    return this.simplified;
  }

  getWithoutVowel(): string {
    return this.withoutVowel;
  }

  getTextWithVariation(key: T_ScriptureTextVariationKey): string {
    return this[key];
  }
}

export class ScriptureDetails {
  private constructor(
    private readonly _number: number,
    private readonly _defaultTranslationId: number,
    private readonly _code: T_ValidScriptureCode,
    private readonly _variation: TextVariationSymbols,
    private readonly _defaultScriptureFont: T_ValidScriptureFont,
    private readonly _verseCountInformationArray: ReadonlyArray<
      ReadonlyArray<number>
    >
  ) {}

  static create(data: {
    number: number;
    defaultTranslationId: number;
    code: T_ValidScriptureCode;
    variation: TextVariationSymbols;
    defaultScriptureFont: T_ValidScriptureFont;
    verseCountInformationArray: number[][];
  }) {
    return new ScriptureDetails(
      data.number,
      data.defaultTranslationId,
      data.code,
      data.variation,
      data.defaultScriptureFont,
      data.verseCountInformationArray
    );
  }

  getCode(): Readonly<T_ValidScriptureCode> {
    return this._code;
  }

  getNumber(): Readonly<number> {
    return this._number;
  }

  getDefaultTranslationId(): Readonly<number> {
    return this._defaultTranslationId;
  }
  getVaritionSymbols(): Readonly<TextVariationSymbols> {
    return this._variation;
  }
  getVerseCountInformationArray(): ReadonlyArray<ReadonlyArray<number>> {
    return this._verseCountInformationArray;
  }

  getDefaultTranslationFont(): Readonly<string> {
    return this._defaultScriptureFont;
  }

  isChapterExistForSection(
    sectionNumber: number,
    chapterNumber: number
  ): boolean {
    const sectionIndex: number = sectionNumber - 1;
    const chapterIndex: number = chapterNumber - 1;

    return Boolean(
      this._verseCountInformationArray.at(sectionIndex)?.at(chapterIndex)
    );
  }

  getVerseCountOfChapterOfSection(
    sectionNumber: number,
    chapterNumber: number
  ): number | null {
    const sectionIndex: number = sectionNumber - 1;
    const chapterIndex: number = chapterNumber - 1;

    return (
      this._verseCountInformationArray.at(sectionIndex)?.at(chapterIndex) ??
      null
    );
  }
}

export class ScriptureMeanDTO extends ScriptureBaseDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    code: T_ValidScriptureCode,
    private readonly meanings: ReadonlyArray<ScriptureMeaningDTO> = []
  ) {
    super(id, name, number, code);
  }

  getMeanings(): ReadonlyArray<ScriptureMeaningDTO> {
    return Object.freeze([...this.meanings]);
  }
}

export class ScriptureUpperMeanDTO extends ScriptureMeanDTO {
  // Inherits everything from ScriptureMeanDTO (no additional fields)
}

export class ScriptureLowerMeanDTO extends ScriptureMeanDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    code: T_ValidScriptureCode,
    meanings: ReadonlyArray<ScriptureMeaningDTO> = [],
    private readonly sections: ReadonlyArray<SectionLowerMeanDTO>
  ) {
    super(id, name, number, code, meanings);
  }

  getSections(): ReadonlyArray<SectionLowerMeanDTO> {
    return Object.freeze([...this.sections]);
  }
}
