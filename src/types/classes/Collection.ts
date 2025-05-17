export enum CollectionStatus {
  Error = 0,
  NotFound = 1,
  AlreadyDone = 2,
  Succeed = 3,
}




//TODO: Amend.


export class CollectionProcessResultDTO {
  constructor(
    private readonly collectionName: string,
    private readonly code: number,
    private readonly message: string | null = null
  ) {}

  getCollectionName(): string {
    return this.collectionName;
  }

  getCode(): number {
    return this.code;
  }

  getMessage(): string | null {
    return this.message;
  }
}

export class CollectionDTO {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly description: string | null,
    private readonly saveCount: number
  ) {}

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string | null {
    return this.description;
  }

  getSaveCount(): number {
    return this.saveCount;
  }
}

export class CollectionWithVerseSavedInformationDTO {
  constructor(
    private readonly name: string,
    private readonly description: string | null,
    private readonly isSaved: boolean
  ) {}

  getName(): string {
    return this.name;
  }

  getDescription(): string | null {
    return this.description;
  }

  getIsSaved(): boolean {
    return this.isSaved;
  }
}
