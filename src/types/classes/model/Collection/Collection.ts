export enum CollectionStatus {
  Error = 0,
  NotFound = 1,
  AlreadyDone = 2,
  Succeed = 3,
}

export class CollectionProcessResult {
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

export type T_CollectionConstructorParameters = {
  id: number;
  name: string;
  description: string | null;
  saveCount: number;
};

export type T_CollectionConstructorParametersJSON = {
  id: number;
  name: string;
  description: string | null;
  saveCount: number;
};
export class Collection {
  private readonly id: number;
  private readonly name: string;
  private readonly description: string | null;
  private readonly saveCount: number;

  constructor(data: T_CollectionConstructorParameters) {
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

  static createFromJSON(data: T_CollectionConstructorParametersJSON) {
    return new Collection({ ...data });
  }
}

export type T_CollectionWithVerseSavedInformationConstructorParameters = {
  name: string;
  description: string | null;
  isSaved: boolean;
};

export type T_CollectionWithVerseSavedInformationConstructorParametersJSON = {
  name: string;
  description: string | null;
  isSaved: boolean;
};

export class CollectionWithVerseSavedInformation {
  private readonly name: string;
  private readonly description: string | null;
  private readonly isSaved: boolean;
  constructor(
    data: T_CollectionWithVerseSavedInformationConstructorParameters
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
    data: T_CollectionWithVerseSavedInformationConstructorParametersJSON
  ) {
    return new CollectionWithVerseSavedInformation({ ...data });
  }
}
