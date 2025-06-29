import { T_UserDTOConstructorParametersJSON, UserDTO } from "./User";
import {
  T_VerseUpperMeanDTOConstructorParametersJSON,
  VerseUpperMeanDTO,
} from "./Verse";

export type T_NoteOwnDTOConstructorParameters = {
  id: number;
  text: string;
  createdAt: Readonly<Date>;
  updatedAt: Readonly<Date> | null;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
};

export type T_NoteOwnDTOConstructorParametersJSON = {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date | null;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
};

export class NoteOwnDTO {
  private readonly id: number;
  private text: string;
  private readonly createdAt: Readonly<Date>;
  private updatedAt: Date | null;
  private likeCount: number;
  private readonly replyCount: number;
  private isLiked: boolean = false;

  constructor(data: T_NoteOwnDTOConstructorParameters) {
    const { id, text, createdAt, updatedAt, likeCount, replyCount, isLiked } =
      data;
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isLiked = isLiked;
    this.likeCount = likeCount;
    this.replyCount = replyCount;
  }

  static createFromJSON(
    data: T_NoteOwnDTOConstructorParametersJSON
  ): NoteOwnDTO {
    const createdAt = new Date(data.createdAt);
    const updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
    return new NoteOwnDTO({ ...data, createdAt, updatedAt });
  }

  getId(): number {
    return this.id;
  }

  setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
  }

  getText(): string {
    return this.text;
  }

  getCreatedAt(): Readonly<Date> {
    return this.createdAt;
  }

  getUpdatedAt(): Readonly<Date> | null {
    return this.updatedAt;
  }

  getLikeCount(): number {
    return this.likeCount;
  }

  setLikeCount(likeCount: number): void {
    this.likeCount = likeCount;
  }

  getReplyCount(): number {
    return this.replyCount;
  }

  isNoteLiked(): boolean {
    return this.isLiked;
  }

  setText(text: string): void {
    this.text = text;
  }

  like(): void {
    const likeCount = this.getLikeCount();
    return this.setLikeCount(likeCount + 1);
  }

  removeLike(): void {
    const likeCount = this.getLikeCount();
    return this.setLikeCount(likeCount - 1);
  }

  setIsNoteLiked(isLiked: boolean): void {
    this.isLiked = isLiked;
  }
}

export type T_NoteOwnVerseDTOConstructorParameters =
  T_NoteOwnDTOConstructorParameters & {
    verse: VerseUpperMeanDTO;
  };

export type T_NoteOwnVerseDTOConstructorParametersJSON =
  T_NoteOwnDTOConstructorParametersJSON & {
    verse: T_VerseUpperMeanDTOConstructorParametersJSON;
  };
export class NoteOwnVerseDTO extends NoteOwnDTO {
  private verse: VerseUpperMeanDTO;
  constructor(data: T_NoteOwnVerseDTOConstructorParameters) {
    super({ ...data });
    this.verse = data.verse;
  }

  static override createFromJSON(
    data: T_NoteOwnVerseDTOConstructorParametersJSON
  ): NoteOwnVerseDTO {
    const verse = VerseUpperMeanDTO.createFromJSON(data.verse);
    return new NoteOwnVerseDTO({ ...data, verse });
  }

  getVerse(): VerseUpperMeanDTO {
    return this.verse;
  }
}

export type T_NoteOwnerDTOConstructorParameters =
  T_NoteOwnDTOConstructorParameters & {
    creator: UserDTO;
  };

export type T_NoteOwnerDTOConstructorParametersJSON =
  T_NoteOwnDTOConstructorParametersJSON & {
    creator: T_UserDTOConstructorParametersJSON;
  };

export class NoteOwnerDTO extends NoteOwnDTO {
  readonly creator: UserDTO;
  constructor(data: T_NoteOwnerDTOConstructorParameters) {
    super({ ...data });
    this.creator = data.creator;
  }

  static override createFromJSON(
    data: T_NoteOwnerDTOConstructorParametersJSON
  ): NoteOwnerDTO {
    const createdAt = new Date(data.createdAt);
    const updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
    const creator = UserDTO.createFromJSON(data.creator);
    return new NoteOwnerDTO({ ...data, createdAt, updatedAt, creator });
  }

  getCreator(): Readonly<UserDTO> {
    return this.creator;
  }
}

export type T_NoteOwnerVerseDTOConstructorParameters =
  T_NoteOwnerDTOConstructorParameters & {
    verse: VerseUpperMeanDTO;
  };

export type T_NoteOwnerVerseDTOConstructorParametersJSON =
  T_NoteOwnerDTOConstructorParametersJSON & {
    verse: T_VerseUpperMeanDTOConstructorParametersJSON;
  };
export class NoteOwnerVerseDTO extends NoteOwnerDTO {
  private verse: VerseUpperMeanDTO;
  constructor(data: T_NoteOwnerVerseDTOConstructorParameters) {
    super({ ...data });

    this.verse = data.verse;
  }

  static override createFromJSON(
    data: T_NoteOwnerVerseDTOConstructorParametersJSON
  ): NoteOwnerVerseDTO {
    const verse = VerseUpperMeanDTO.createFromJSON(data.verse);
    const creator = UserDTO.createFromJSON(data.creator);
    return new NoteOwnerVerseDTO({ ...data, verse, creator });
  }

  getVerse(): VerseUpperMeanDTO {
    return this.verse;
  }
}
