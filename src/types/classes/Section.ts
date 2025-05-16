import {
  ChapterLowerDTO,
  ChapterDTO,
  ChapterLowerConfinedDTO,
  ChapterLowerMeanDTO,
} from "./Chapter";
import { Meaning } from "./Language";
import {
  ScriptureDTO,
  ScriptureUpperConfinedDTO,
  ScriptureUpperMeanDTO,
} from "./Scripture";

export abstract class SectionBaseDTO {
  constructor(
    protected readonly id: number,
    protected readonly name: string,
    protected readonly number: number
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

export abstract class SectionSimpleDTO extends SectionBaseDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    protected readonly meanings: ReadonlyArray<SectionMeaningDTO> = []
  ) {
    super(id, name, number);
  }

  getMeanings(): ReadonlyArray<SectionMeaningDTO> {
    return this.meanings;
  }
}

export class SectionDTO extends SectionSimpleDTO {
  // No additional fields
}

export class SectionUpperDTO extends SectionDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    meanings: ReadonlyArray<SectionMeaningDTO> = [],
    private readonly scripture: Readonly<ScriptureDTO>
  ) {
    super(id, name, number, meanings);
  }

  getScripture(): Readonly<ScriptureDTO> {
    return this.scripture;
  }
}

export class SectionLowerDTO extends SectionDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    meanings: ReadonlyArray<SectionMeaningDTO> = [],
    private readonly chapters: ReadonlyArray<ChapterLowerDTO>
  ) {
    super(id, name, number, meanings);
  }

  getChapters(): ReadonlyArray<ChapterLowerDTO> {
    return this.chapters;
  }
}

export class SectionOneLevelLowerDTO extends SectionDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    meanings: ReadonlyArray<SectionMeaningDTO> = [],
    private readonly chapters: ReadonlyArray<ChapterDTO>
  ) {
    super(id, name, number, meanings);
  }

  getChapters(): ReadonlyArray<ChapterDTO> {
    return this.chapters;
  }
}

export class SectionBothDTO extends SectionDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    meanings: ReadonlyArray<SectionMeaningDTO> = [],
    private readonly scripture: Readonly<ScriptureDTO>,
    private readonly chapters: ReadonlyArray<ChapterLowerDTO>
  ) {
    super(id, name, number, meanings);
  }

  getScripture(): Readonly<ScriptureDTO> {
    return this.scripture;
  }

  getChapters(): ReadonlyArray<ChapterLowerDTO> {
    return this.chapters;
  }
}

export class SectionMeaningDTO extends Meaning {
  // Inherits from Meaning (already assumed to be immutable)
}

export abstract class SectionConfinedDTO extends SectionBaseDTO {
  constructor(id: number, name: string, number: number) {
    super(id, name, number);
  }
}

export class SectionUpperConfinedDTO extends SectionConfinedDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    private readonly scripture: Readonly<ScriptureUpperConfinedDTO>
  ) {
    super(id, name, number);
  }

  getScripture(): Readonly<ScriptureUpperConfinedDTO> {
    return this.scripture;
  }
}

export class SectionLowerConfinedDTO extends SectionConfinedDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    private readonly chapters: ReadonlyArray<ChapterLowerConfinedDTO>
  ) {
    super(id, name, number);
  }

  getChapters(): ReadonlyArray<ChapterLowerConfinedDTO> {
    return this.chapters;
  }
}

export class SectionMeanDTO extends SectionBaseDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    private readonly meanings: ReadonlyArray<SectionMeaningDTO> = []
  ) {
    super(id, name, number);
  }

  getMeanings(): ReadonlyArray<SectionMeaningDTO> {
    return Object.freeze([...this.meanings]);
  }
}

export class SectionUpperMeanDTO extends SectionMeanDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    meanings: ReadonlyArray<SectionMeaningDTO> = [],
    private readonly scripture: Readonly<ScriptureUpperMeanDTO>
  ) {
    super(id, name, number, meanings);
  }

  getScripture(): Readonly<ScriptureUpperMeanDTO> {
    return Object.freeze(this.scripture);
  }
}

export class SectionLowerMeanDTO extends SectionMeanDTO {
  constructor(
    id: number,
    name: string,
    number: number,
    meanings: ReadonlyArray<SectionMeaningDTO> = [],
    private readonly chapters: ReadonlyArray<ChapterLowerMeanDTO>
  ) {
    super(id, name, number, meanings);
  }

  getChapters(): ReadonlyArray<ChapterLowerMeanDTO> {
    return Object.freeze([...this.chapters]);
  }
}
