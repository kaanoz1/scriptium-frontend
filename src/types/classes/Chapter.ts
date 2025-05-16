import { Meaning } from "./Language";
import {
  SectionUpperDTO,
  SectionDTO,
  SectionUpperConfinedDTO,
  SectionUpperMeanDTO,
} from "./Section";
import {
  VerseLowerDTO,
  VerseDTO,
  VerseLowerConfinedDTO,
  VerseLowerMeanDTO,
} from "./Verse";

// Base class
export abstract class ChapterBaseDTO {
  constructor(
    protected readonly id: Readonly<number>,
    protected readonly name: Readonly<string>,
    protected readonly number: Readonly<number>
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
}

// Simple DTO with meanings
export abstract class ChapterSimpleDTO extends ChapterBaseDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    protected readonly meanings: ReadonlyArray<ChapterMeaningDTO> = []
  ) {
    super(id, name, number);
  }

  getMeanings(): ReadonlyArray<ChapterMeaningDTO> {
    return this.meanings;
  }
}

export class ChapterDTO extends ChapterSimpleDTO {}

// One level upper
export class ChapterUpperDTO extends ChapterDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    meanings: ReadonlyArray<ChapterMeaningDTO> = [],
    private readonly section: Readonly<SectionUpperDTO>
  ) {
    super(id, name, number, meanings);
  }

  getSection(): Readonly<SectionUpperDTO> {
    return this.section;
  }
}

// Less detailed upward
export class ChapterOneLevelUpperDTO extends ChapterDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    meanings: ReadonlyArray<ChapterMeaningDTO> = [],
    private readonly section: Readonly<SectionDTO>
  ) {
    super(id, name, number, meanings);
  }

  getSection(): Readonly<SectionDTO> {
    return this.section;
  }
}

// Lower DTO with multiple verses
export class ChapterLowerDTO extends ChapterDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    meanings: ReadonlyArray<ChapterMeaningDTO> = [],
    private readonly verses: ReadonlyArray<VerseLowerDTO>
  ) {
    super(id, name, number, meanings);
  }

  getVerses(): ReadonlyArray<VerseLowerDTO> {
    return this.verses;
  }
}

// One level lower with single verse
export class ChapterOneLevelLowerDTO extends ChapterDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    meanings: ReadonlyArray<ChapterMeaningDTO> = [],
    private readonly verses: Readonly<VerseDTO>
  ) {
    super(id, name, number, meanings);
  }

  getVerses(): Readonly<VerseDTO> {
    return this.verses;
  }
}

// Bidirectional DTO
export class ChapterBothDTO extends ChapterDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    meanings: ReadonlyArray<ChapterMeaningDTO> = [],
    private readonly section: Readonly<SectionUpperDTO>,
    private readonly verses: ReadonlyArray<VerseLowerDTO>
  ) {
    super(id, name, number, meanings);
  }

  getSection(): Readonly<SectionUpperDTO> {
    return this.section;
  }

  getVerses(): ReadonlyArray<VerseLowerDTO> {
    return this.verses;
  }
}

// Meaning DTO
export class ChapterMeaningDTO extends Meaning {}

// Confined DTO base
export abstract class ChapterConfinedDTO extends ChapterBaseDTO {
  constructor(id: number, name: string, number: number) {
    super(id, name, number);
  }
}

// Confined with section
export class ChapterUpperConfinedDTO extends ChapterConfinedDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    private readonly section: Readonly<SectionUpperConfinedDTO>
  ) {
    super(id, name, number);
  }

  getSection(): Readonly<SectionUpperConfinedDTO> {
    return this.section;
  }
}

// Confined with verses
export class ChapterLowerConfinedDTO extends ChapterConfinedDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    private readonly verses: ReadonlyArray<VerseLowerConfinedDTO>
  ) {
    super(id, name, number);
  }

  getVerses(): ReadonlyArray<VerseLowerConfinedDTO> {
    return this.verses;
  }
}

export class ChapterMeanDTO extends ChapterBaseDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    private readonly meanings: ReadonlyArray<ChapterMeaningDTO> = []
  ) {
    super(id, name, number);
  }

  getMeanings(): ReadonlyArray<ChapterMeaningDTO> {
    return Object.freeze([...this.meanings]);
  }
}

export class ChapterUpperMeanDTO extends ChapterMeanDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    meanings: ReadonlyArray<ChapterMeaningDTO> = [],
    private readonly section: Readonly<SectionUpperMeanDTO>
  ) {
    super(id, name, number, meanings);
  }

  getSection(): Readonly<SectionUpperMeanDTO> {
    return Object.freeze(this.section);
  }
}

export class ChapterLowerMeanDTO extends ChapterMeanDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    meanings: ReadonlyArray<ChapterMeaningDTO> = [],
    private readonly verses: ReadonlyArray<VerseLowerMeanDTO>
  ) {
    super(id, name, number, meanings);
  }

  getVerses(): ReadonlyArray<VerseLowerMeanDTO> {
    return Object.freeze([...this.verses]);
  }
}
