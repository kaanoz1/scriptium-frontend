export enum CollectionStatus {
  Error = 0,
  NotFound = 1,
  AlreadyDone = 2,
  Succeed = 3,
}

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

export type T_CollectionDTOConstructorParameters = {
  id: number;
  name: string;
  description: string | null;
  saveCount: number;
};

export type T_CollectionDTOConstructorParametersJSON = {
  id: number;
  name: string;
  description: string | null;
  saveCount: number;
};
export class CollectionDTO {
  private readonly id: number;
  private readonly name: string;
  private readonly description: string | null;
  private readonly saveCount: number;

  constructor(data: T_CollectionDTOConstructorParameters) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.saveCount = data.saveCount;
  }

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

  static createFromJSON(data: T_CollectionDTOConstructorParametersJSON) {
    return new CollectionDTO({ ...data });
  }
}

export type T_CollectionWithVerseSavedInformationDTOConstructorParameters = {
  name: string;
  description: string | null;
  isSaved: boolean;
};

export type T_CollectionWithVerseSavedInformationDTOConstructorParametersJSON =
  {
    name: string;
    description: string | null;
    isSaved: boolean;
  };

export class CollectionWithVerseSavedInformationDTO {
  private readonly name: string;
  private readonly description: string | null;
  private readonly isSaved: boolean;
  constructor(
    data: T_CollectionWithVerseSavedInformationDTOConstructorParameters
  ) {
    this.name = data.name;
    this.description = data.description;
    this.isSaved = data.isSaved;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string | null {
    return this.description;
  }

  getIsSaved(): boolean {
    return this.isSaved;
  }

  static createFromJSON(
    data: T_CollectionWithVerseSavedInformationDTOConstructorParametersJSON
  ) {
    return new CollectionWithVerseSavedInformationDTO({ ...data });
  }
}
