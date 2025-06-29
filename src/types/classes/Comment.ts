import {
  NoteOwnDTO,
  NoteOwnerVerseDTO,
  T_NoteOwnDTOConstructorParametersJSON,
  T_NoteOwnerVerseDTOConstructorParametersJSON,
} from "./Note";
import { T_UserDTOConstructorParametersJSON, UserDTO } from "./User";
import {
  T_VerseUpperMeanDTOConstructorParametersJSON,
  VerseUpperMeanDTO,
} from "./Verse";

export type T_CommentBaseDTOConstructorParameters = {
  id: number;
  text: string;
  createdAt: Date;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
  updatedAt: Date | null;
};

export type T_CommentBaseDTOConstructorParametersJSON = {
  id: number;
  text: string;
  createdAt: Date;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
  updatedAt: Date | null;
};

export class CommentBaseDTO {
  private readonly id: number;
  private text: string;
  private readonly createdAt: Date;
  private likeCount: number;
  private readonly replyCount: number;
  private isLiked: boolean = false;
  private updatedAt: Date | null;

  constructor(data: T_CommentBaseDTOConstructorParameters) {
    this.id = data.id;
    this.text = data.text;
    this.createdAt = data.createdAt;
    this.likeCount = data.likeCount;
    this.replyCount = data.replyCount;
    this.isLiked = data.isLiked;
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
  }

  static createFromJSON(
    data: T_CommentBaseDTOConstructorParametersJSON
  ): CommentBaseDTO {
    return new CommentBaseDTO({ ...data });
  }

  public getId(): number {
    return this.id;
  }

  public getText(): string {
    return this.text;
  }

  getCreatedAt(): Readonly<Date> {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }

  getLikeCount(): number {
    return this.likeCount;
  }

  getReplyCount(): number {
    return this.replyCount;
  }

  isCommentLiked(): boolean {
    return this.isLiked;
  }

  public setLikedCount(likeCount: number): void {
    this.likeCount = likeCount;
  }

  setIsLiked(isLiked: boolean) {
    this.isLiked = isLiked;
  }

  setText(text: string) {
    this.text = text;
  }
}

export type T_ParentCommentDTOConstructorParameters =
  T_CommentBaseDTOConstructorParameters & { user: UserDTO };

export type T_ParentCommentDTOConstructorParametersJSON =
  T_CommentBaseDTOConstructorParametersJSON & {
    user: T_UserDTOConstructorParametersJSON;
  };

export class ParentCommentDTO extends CommentBaseDTO {
  readonly user: UserDTO | null = null;

  constructor(data: T_ParentCommentDTOConstructorParameters) {
    super({ ...data });
    this.user = data.user;
  }

  static override createFromJSON(
    data: T_ParentCommentDTOConstructorParametersJSON
  ): ParentCommentDTO {
    const user = UserDTO.createFromJSON(data.user);
    return new ParentCommentDTO({ ...data, user });
  }

  getUser(): Readonly<UserDTO> | null {
    return this.user;
  }
}

export type T_CommentOwnDTOConstructorParameters =
  T_CommentBaseDTOConstructorParameters & {
    parentComment: ParentCommentDTO | null;
  };

export type T_CommentOwnDTOConstructorParametersJSON =
  T_CommentBaseDTOConstructorParametersJSON & {
    parentComment: T_ParentCommentDTOConstructorParametersJSON | null;
  };

export class CommentOwnDTO extends CommentBaseDTO {
  readonly parentComment: ParentCommentDTO | null = null;
  constructor(data: T_CommentOwnDTOConstructorParameters) {
    super({ ...data });
    this.parentComment = data.parentComment;
  }

  static override createFromJSON(
    data: T_CommentOwnDTOConstructorParametersJSON
  ): CommentOwnDTO {
    const parentComment = data.parentComment
      ? ParentCommentDTO.createFromJSON(data.parentComment)
      : null;
    return new CommentOwnDTO({ ...data, parentComment });
  }

  getParentComment(): ParentCommentDTO | null {
    return this.parentComment;
  }

  public likeAndGetClone() {
    this.setIsLiked(true);
    return this.increaseLikeCountAndGetClone();
  }

  public unlikeAndGetClone() {
    this.setIsLiked(false);
    return this.decreaseLikeCountAndGetClone();
  }
  protected increaseLikeCountAndGetClone() {
    this.setLikedCount(this.getLikeCount() + 1);
    return this.getClone();
  }

  protected decreaseLikeCountAndGetClone() {
    this.setLikedCount(this.getLikeCount() + 1);
    return this.getClone();
  }

  protected getClone(): CommentOwnDTO {
    const id = this.getId();
    const text = this.getText();
    const likeCount = this.getLikeCount();
    const replyCount = this.getReplyCount();
    const createdAt = this.getCreatedAt();
    const isLiked = this.isCommentLiked();
    const parentComment = this.getParentComment();
    const updatedAt = this.getUpdatedAt();

    return new CommentOwnDTO({
      id,
      text,
      createdAt,
      replyCount,
      likeCount,
      isLiked,
      parentComment,
      updatedAt,
    });
  }
}

export type T_CommentOwnerDTOConstructorParameters =
  T_CommentOwnDTOConstructorParameters & {
    creator: UserDTO;
  };

export type T_CommentOwnerDTOConstructorParametersJSON =
  T_CommentOwnDTOConstructorParametersJSON & {
    creator: T_UserDTOConstructorParametersJSON;
  };

export class CommentOwnerDTO extends CommentOwnDTO {
  readonly creator: UserDTO;

  constructor(data: T_CommentOwnerDTOConstructorParameters) {
    super({ ...data });

    this.creator = data.creator;
  }

  getCreator(): UserDTO {
    return this.creator;
  }

  protected override increaseLikeCountAndGetClone() {
    this.setLikedCount(this.getLikeCount() + 1);
    return this.getClone();
  }

  protected override decreaseLikeCountAndGetClone() {
    this.setLikedCount(this.getLikeCount() + 1);
    return this.getClone();
  }

  public override likeAndGetClone() {
    this.setIsLiked(true);
    return this.increaseLikeCountAndGetClone();
  }

  public override unlikeAndGetClone() {
    this.setIsLiked(false);
    return this.decreaseLikeCountAndGetClone();
  }

  static override createFromJSON(
    data: T_CommentOwnerDTOConstructorParametersJSON
  ): CommentOwnerDTO {
    const creator = UserDTO.createFromJSON(data.creator);
    const parentComment = data.parentComment
      ? ParentCommentDTO.createFromJSON(data.parentComment)
      : null;
    return new CommentOwnerDTO({ ...data, creator, parentComment });
  }

  protected override getClone(): CommentOwnerDTO {
    const id = this.getId();
    const text = this.getText();
    const creator = this.getCreator();
    const likeCount = this.getLikeCount();
    const replyCount = this.getReplyCount();
    const createdAt = this.getCreatedAt();
    const isLiked = this.isCommentLiked();
    const parentComment = this.getParentComment();
    const updatedAt = this.getUpdatedAt();

    return new CommentOwnerDTO({
      id,
      text,
      createdAt,
      creator,
      replyCount,
      likeCount,
      isLiked,
      parentComment,
      updatedAt,
    });
  }
}

export type T_CommentOwnNoteDTOConstructorParameters =
  T_CommentOwnDTOConstructorParameters & {
    note: NoteOwnDTO;
  };

export type T_CommentOwnNoteDTOConstructorParametersJSON =
  T_CommentOwnDTOConstructorParametersJSON & {
    note: T_NoteOwnDTOConstructorParametersJSON;
  };

export class CommentOwnNoteDTO extends CommentOwnDTO {
  readonly note: NoteOwnDTO;
  constructor(data: {
    id: number;
    text: string;
    createdAt: Date;
    likeCount: number;
    replyCount: number;
    note: NoteOwnDTO;
    isLiked: boolean;
    updatedAt: Date | null;
    parentComment: ParentCommentDTO | null;
  }) {
    super({ ...data });

    this.note = data.note;
  }

  protected override increaseLikeCountAndGetClone() {
    this.setLikedCount(this.getLikeCount() + 1);
    return this.getClone();
  }

  protected override decreaseLikeCountAndGetClone() {
    this.setLikedCount(this.getLikeCount() + 1);
    return this.getClone();
  }

  static override createFromJSON(
    data: T_CommentOwnNoteDTOConstructorParametersJSON
  ): CommentOwnNoteDTO {
    const note = NoteOwnDTO.createFromJSON(data.note);
    const parentComment = data.parentComment
      ? ParentCommentDTO.createFromJSON(data.parentComment)
      : null;
    return new CommentOwnNoteDTO({ ...data, note, parentComment });
  }

  getNote(): NoteOwnDTO {
    return this.note;
  }

  public override likeAndGetClone() {
    this.setIsLiked(true);
    return this.increaseLikeCountAndGetClone();
  }

  public override unlikeAndGetClone() {
    this.setIsLiked(false);
    return this.decreaseLikeCountAndGetClone();
  }
}

export type T_CommentOwnVerseDTOConstructorParameters =
  T_CommentOwnDTOConstructorParameters & {
    verse: VerseUpperMeanDTO;
  };

export type T_CommentOwnVerseDTOConstructorParametersJSON =
  T_CommentOwnDTOConstructorParametersJSON & {
    verse: T_VerseUpperMeanDTOConstructorParametersJSON;
  };

export class CommentOwnVerseDTO extends CommentOwnDTO {
  private readonly verse: VerseUpperMeanDTO;

  constructor(data: {
    id: number;
    text: string;
    createdAt: Readonly<Date>;
    likeCount: number;
    replyCount: number;
    verse: VerseUpperMeanDTO;
    isLiked: boolean;
    updatedAt: Date | null;
    parentComment: ParentCommentDTO | null;
  }) {
    super({ ...data });
    this.verse = data.verse;
  }

  static override createFromJSON(
    data: T_CommentOwnVerseDTOConstructorParametersJSON
  ): CommentOwnVerseDTO {
    const verse = VerseUpperMeanDTO.createFromJSON(data.verse);
    const parentComment = data.parentComment
      ? ParentCommentDTO.createFromJSON(data.parentComment)
      : null;
    return new CommentOwnVerseDTO({ ...data, verse, parentComment });
  }

  getVerse(): VerseUpperMeanDTO {
    return this.verse;
  }

  public override likeAndGetClone() {
    this.setIsLiked(true);
    return this.increaseLikeCountAndGetClone();
  }

  public override unlikeAndGetClone() {
    this.setIsLiked(false);
    return this.decreaseLikeCountAndGetClone();
  }
}

export type T_CommentOwnerNoteDTOConstructorParameters =
  T_CommentOwnDTOConstructorParameters & {
    note: Readonly<NoteOwnerVerseDTO>;
  };

export type T_CommentOwnerNoteDTOConstructorParametersJSON =
  T_CommentOwnerDTOConstructorParametersJSON & {
    note: T_NoteOwnerVerseDTOConstructorParametersJSON;
  };

export class CommentOwnerNoteDTO extends CommentOwnerDTO {
  readonly note: NoteOwnerVerseDTO;
  constructor(data: {
    id: number;
    text: string;
    createdAt: Readonly<Date>;
    likeCount: number;
    replyCount: number;
    note: NoteOwnerVerseDTO;
    isLiked: boolean;
    creator: UserDTO;
    updatedAt: Readonly<Date> | null;
    parentComment: ParentCommentDTO | null;
  }) {
    super({ ...data });
    this.note = data.note;
  }

  static override createFromJSON(
    data: T_CommentOwnerNoteDTOConstructorParametersJSON
  ): CommentOwnerNoteDTO {
    const parentComment = data.parentComment
      ? ParentCommentDTO.createFromJSON(data.parentComment)
      : null;
    const note = NoteOwnerVerseDTO.createFromJSON(data.note);
    const creator = UserDTO.createFromJSON(data.note.creator);
    return new CommentOwnerNoteDTO({ ...data, parentComment, note, creator });
  }

  protected override increaseLikeCountAndGetClone() {
    this.setLikedCount(this.getLikeCount() + 1);
    return this.getClone();
  }

  protected override decreaseLikeCountAndGetClone() {
    this.setLikedCount(this.getLikeCount() + 1);
    return this.getClone();
  }

  getNote(): NoteOwnerVerseDTO {
    return this.note;
  }
}

export type T_CommentOwnerVerseDTOConstructorParameters =
  T_CommentOwnerDTOConstructorParameters & {
    verse: VerseUpperMeanDTO;
  };

export type T_CommentOwnerVerseDTOConstructorParametersJSON =
  T_CommentOwnerDTOConstructorParametersJSON & {
    verse: T_VerseUpperMeanDTOConstructorParametersJSON;
  };

export class CommentOwnerVerseDTO extends CommentOwnerDTO {
  readonly verse: VerseUpperMeanDTO;
  constructor(data: T_CommentOwnerVerseDTOConstructorParameters) {
    super({ ...data });
    this.verse = data.verse;
  }

  protected override getClone(): CommentOwnerVerseDTO {
    const id = this.getId();
    const text = this.getText();
    const creator = this.getCreator();
    const likeCount = this.getLikeCount();
    const replyCount = this.getReplyCount();
    const createdAt = this.getCreatedAt();
    const verse = this.getVerse();
    const isLiked = this.isCommentLiked();
    const parentComment = this.getParentComment();
    const updatedAt = this.getUpdatedAt();

    return new CommentOwnerVerseDTO({
      id,
      text,
      createdAt,
      creator,
      replyCount,
      likeCount,
      verse,
      isLiked,
      parentComment,
      updatedAt,
    });
  }

  static override createFromJSON(
    data: T_CommentOwnerVerseDTOConstructorParametersJSON
  ): CommentOwnerVerseDTO {
    const verse = VerseUpperMeanDTO.createFromJSON(data.verse);
    const creator = UserDTO.createFromJSON(data.creator);
    const parentComment = data.parentComment
      ? ParentCommentDTO.createFromJSON(data.parentComment)
      : null;
    return new CommentOwnerVerseDTO({ ...data, verse, creator, parentComment });
  }

  protected override increaseLikeCountAndGetClone() {
    this.setLikedCount(this.getLikeCount() + 1);
    return this.getClone();
  }

  protected override decreaseLikeCountAndGetClone() {
    this.setLikedCount(this.getLikeCount() + 1);
    return this.getClone();
  }

  getVerse(): VerseUpperMeanDTO {
    return this.verse;
  }
}
