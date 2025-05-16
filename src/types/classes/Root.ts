import { WordUpperDTO, WordUpperConfinedDTO } from "./Word";

export abstract class RootBaseDTO {
  constructor(
    protected readonly latin: string,
    protected readonly own: string
  ) {}

  getLatin(): string {
    return this.latin;
  }

  getOwn(): string {
    return this.own;
  }
}

export class RootDTO extends RootBaseDTO {
  // No extra fields
}

export class RootUpperDTO extends RootDTO {
  constructor(
    latin: string,
    own: string,
    private readonly words: ReadonlyArray<WordUpperDTO>
  ) {
    super(latin, own);
  }

  getWords(): ReadonlyArray<WordUpperDTO> {
    return this.words;
  }
}

export class RootLowerDTO extends RootDTO {
  // No extra fields
}

export abstract class RootConfinedDTO extends RootBaseDTO {
  constructor(latin: string, own: string) {
    super(latin, own);
  }
}

export class RootUpperConfinedDTO extends RootConfinedDTO {
  constructor(
    latin: string,
    own: string,
    private readonly words: ReadonlyArray<WordUpperConfinedDTO>
  ) {
    super(latin, own);
  }

  getWords(): ReadonlyArray<WordUpperConfinedDTO> {
    return this.words;
  }
}

export class RootLowerConfinedDTO extends RootConfinedDTO {}
