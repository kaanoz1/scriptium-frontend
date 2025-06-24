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
  verse: VerseUpperMeanDTO;
};

export type T_NoteOwnDTOConstructorParametersJSON = {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date | null;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
  verse: T_VerseUpperMeanDTOConstructorParametersJSON;
};

export class NoteOwnDTO {
  private readonly id: number;
  private text: string;
  private readonly createdAt: Readonly<Date>;
  private readonly updatedAt: Readonly<Date> | null;
  private likeCount: number;
  private readonly replyCount: number;
  private isLiked: boolean = false;
  private readonly _verse: Readonly<VerseUpperMeanDTO>;

  constructor(data: {
    id: number;
    text: string;
    createdAt: Readonly<Date>;
    updatedAt: Readonly<Date> | null;
    likeCount: number;
    replyCount: number;
    isLiked: boolean;
    _verse: Readonly<VerseUpperMeanDTO>;
  }) {
    const {
      id,
      text,
      createdAt,
      updatedAt,
      likeCount,
      replyCount,
      isLiked,
      _verse,
    } = data;
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isLiked = isLiked;
    this.likeCount = likeCount;
    this.replyCount = replyCount;
    this._verse = _verse;
  }

  static createFromJSON(
    data: T_NoteOwnDTOConstructorParametersJSON
  ): NoteOwnDTO {
    const _verse = VerseUpperMeanDTO.createFromJSON(data.verse);
    const createdAt = new Date(data.createdAt);
    const updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
    return new NoteOwnDTO({ ...data, _verse, createdAt, updatedAt });
  }

  getId(): number {
    return this.id;
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

  getVerse(): Readonly<VerseUpperMeanDTO> {
    return this._verse;
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
  readonly creator: Readonly<UserDTO>;
  constructor(data: {
    id: number;
    text: string;
    createdAt: Readonly<Date>;
    updatedAt: Readonly<Date> | null;
    likeCount: number;
    replyCount: number;
    creator: UserDTO;
    isLiked: boolean;
    _verse: VerseUpperMeanDTO;
  }) {
    super({ ...data });
    this.creator = data.creator;
  }

  static override createFromJSON(
    data: T_NoteOwnerDTOConstructorParametersJSON
  ): NoteOwnerDTO {
    const _verse = VerseUpperMeanDTO.createFromJSON(data.verse);
    const createdAt = new Date(data.createdAt);
    const updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
    const creator = UserDTO.createFromJSON(data.creator);
    return new NoteOwnerDTO({ ...data, _verse, createdAt, updatedAt, creator });
  }

  getCreator(): Readonly<UserDTO> {
    return this.creator;
  }
}
