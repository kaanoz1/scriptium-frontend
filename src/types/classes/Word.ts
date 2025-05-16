import { Meaning } from "./Language";
import { RootDTO, RootLowerConfinedDTO } from "./Root";
import {
  VerseUpperDTO,
  VerseDTO,
  VerseUpperConfinedDTO,
  TextVariationDTO,
} from "./Verse";

export abstract class WordBaseDTO {
  constructor(
    protected readonly id: number,
    protected readonly sequenceNumber: number
  ) {}

  getId(): number {
    return this.id;
  }

  getSequenceNumber(): number {
    return this.sequenceNumber;
  }
}

export abstract class WordSimpleDTO extends WordBaseDTO {
  constructor(
    id: number,
    sequenceNumber: number,
    protected readonly variation: Readonly<TextVariationDTO>,
    protected readonly meanings: ReadonlyArray<WordMeaningDTO> = []
  ) {
    super(id, sequenceNumber);
  }

  getVariation(): Readonly<TextVariationDTO> {
    return Object.freeze(this.variation);
  }

  getMeanings(): ReadonlyArray<WordMeaningDTO> {
    return Object.freeze([...this.meanings]);
  }
}

export class WordDTO extends WordSimpleDTO {
  // No additional fields
}

export class WordUpperDTO extends WordDTO {
  constructor(
    id: number,
    sequenceNumber: number,
    variation: Readonly<TextVariationDTO>,
    meanings: ReadonlyArray<WordMeaningDTO>,
    private readonly verse: Readonly<VerseUpperDTO>
  ) {
    super(id, sequenceNumber, variation, meanings);
  }

  getVerse(): Readonly<VerseUpperDTO> {
    return Object.freeze(this.verse);
  }
}

export class WordOneLevelUpperDTO extends WordDTO {
  constructor(
    id: number,
    sequenceNumber: number,
    variation: Readonly<TextVariationDTO>,
    meanings: ReadonlyArray<WordMeaningDTO>,
    private readonly verse: Readonly<VerseDTO>
  ) {
    super(id, sequenceNumber, variation, meanings);
  }

  getVerse(): Readonly<VerseDTO> {
    return Object.freeze(this.verse);
  }
}

export class WordLowerDTO extends WordDTO {
  constructor(
    id: number,
    sequenceNumber: number,
    variation: Readonly<TextVariationDTO>,
    meanings: ReadonlyArray<WordMeaningDTO>,
    private readonly roots: ReadonlyArray<RootDTO> = []
  ) {
    super(id, sequenceNumber, variation, meanings);
  }

  getRoots(): ReadonlyArray<RootDTO> {
    return Object.freeze([...this.roots]);
  }
}

export class WordBothDTO extends WordDTO {
  constructor(
    id: number,
    sequenceNumber: number,
    variation: Readonly<TextVariationDTO>,
    meanings: ReadonlyArray<WordMeaningDTO>,
    private readonly verse: Readonly<VerseDTO>,
    private readonly roots: ReadonlyArray<RootDTO> = []
  ) {
    super(id, sequenceNumber, variation, meanings);
  }

  getVerse(): Readonly<VerseDTO> {
    return Object.freeze(this.verse);
  }

  getRoots(): ReadonlyArray<RootDTO> {
    return Object.freeze([...this.roots]);
  }
}

export class WordMeaningDTO extends Meaning {
  // Inherits from Meaning
}

export abstract class WordConfinedDTO extends WordBaseDTO {
  constructor(id: number, sequenceNumber: number) {
    super(id, sequenceNumber);
  }
}

export class WordUpperConfinedDTO extends WordConfinedDTO {
  constructor(
    id: number,
    sequenceNumber: number,
    private readonly verse: Readonly<VerseUpperConfinedDTO>
  ) {
    super(id, sequenceNumber);
  }

  getVerse(): Readonly<VerseUpperConfinedDTO> {
    return Object.freeze(this.verse);
  }
}

export class WordLowerConfinedDTO extends WordConfinedDTO {
  constructor(
    id: number,
    sequenceNumber: number,
    private readonly roots: ReadonlyArray<RootLowerConfinedDTO>
  ) {
    super(id, sequenceNumber);
  }

  getRoots(): ReadonlyArray<RootLowerConfinedDTO> {
    return Object.freeze([...this.roots]);
  }
}
