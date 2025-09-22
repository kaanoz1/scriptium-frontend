import {
  NoteOwn,
  T_NoteOwnConstructorParametersJSON,
} from "../Note/NoteOwn/NoteOwn";
import {
  NoteOwnerVerse,
  T_NoteOwnerVerseConstructorParametersJSON,
} from "../Note/NoteOwner/NoteOwnerVerse/NoteOwnerVerse";
import { User, T_UserConstructorParametersJSON } from "../User/User";
import {
  VerseUpperMean,
  T_VerseUpperMeanConstructorParametersJSON,
} from "../Verse/VerseMean/VerseUpperMean/VerseUpperMean";

export type T_CommentBaseConstructorParameters = {
  id: number;
  text: string;
  createdAt: Date;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
  updatedAt: Date | null;
};

export type T_CommentBaseConstructorParametersJSON = {
  id: number;
  text: string;
  createdAt: Date;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
  updatedAt: Date | null;
};

export class CommentBase {
  private readonly id: number;
  private text: string;
  private readonly createdAt: Date;
  private likeCount: number;
  private readonly replyCount: number;
  private isLiked: boolean = false;
  private updatedAt: Date | null;

  constructor(data: T_CommentBaseConstructorParameters) {
    this.id = data.id;
    this.text = data.text;
    this.createdAt = data.createdAt;
    this.likeCount = data.likeCount;
    this.replyCount = data.replyCount;
    this.isLiked = data.isLiked;
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
  }

  static createFromJSON(
    data: T_CommentBaseConstructorParametersJSON
  ): CommentBase {
    return new CommentBase({ ...data });
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

export type T_ParentCommentConstructorParameters =
  T_CommentBaseConstructorParameters & { user: User };

export type T_ParentCommentConstructorParametersJSON =
  T_CommentBaseConstructorParametersJSON & {
    user: T_UserConstructorParametersJSON;
  };

export class ParentComment extends CommentBase {
  readonly user: User | null = null;

  constructor(data: T_ParentCommentConstructorParameters) {
    super({ ...data });
    this.user = data.user;
  }

  static override createFromJSON(
    data: T_ParentCommentConstructorParametersJSON
  ): ParentComment {
    const user = User.createFromJSON(data.user);
    return new ParentComment({ ...data, user });
  }

  getUser(): Readonly<User> | null {
    return this.user;
  }
}

export type T_CommentOwnConstructorParameters =
  T_CommentBaseConstructorParameters & {
    parentComment: ParentComment | null;
  };

export type T_CommentOwnConstructorParametersJSON =
  T_CommentBaseConstructorParametersJSON & {
    parentComment: T_ParentCommentConstructorParametersJSON | null;
  };

export class CommentOwn extends CommentBase {
  readonly parentComment: ParentComment | null = null;
  constructor(data: T_CommentOwnConstructorParameters) {
    super({ ...data });
    this.parentComment = data.parentComment;
  }

  static override createFromJSON(
    data: T_CommentOwnConstructorParametersJSON
  ): CommentOwn {
    const parentComment = data.parentComment
      ? ParentComment.createFromJSON(data.parentComment)
      : null;
    return new CommentOwn({ ...data, parentComment });
  }

  getParentComment(): ParentComment | null {
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

  protected getClone(): CommentOwn {
    const id = this.getId();
    const text = this.getText();
    const likeCount = this.getLikeCount();
    const replyCount = this.getReplyCount();
    const createdAt = this.getCreatedAt();
    const isLiked = this.isCommentLiked();
    const parentComment = this.getParentComment();
    const updatedAt = this.getUpdatedAt();

    return new CommentOwn({
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

export type T_CommentOwnerConstructorParameters =
  T_CommentOwnConstructorParameters & {
    creator: User;
  };

export type T_CommentOwnerConstructorParametersJSON =
  T_CommentOwnConstructorParametersJSON & {
    creator: T_UserConstructorParametersJSON;
  };

export class CommentOwner extends CommentOwn {
  readonly creator: User;

  constructor(data: T_CommentOwnerConstructorParameters) {
    super({ ...data });

    this.creator = data.creator;
  }

  getCreator(): User {
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
    data: T_CommentOwnerConstructorParametersJSON
  ): CommentOwner {
    const creator = User.createFromJSON(data.creator);
    const parentComment = data.parentComment
      ? ParentComment.createFromJSON(data.parentComment)
      : null;
    return new CommentOwner({ ...data, creator, parentComment });
  }

  protected override getClone(): CommentOwner {
    const id = this.getId();
    const text = this.getText();
    const creator = this.getCreator();
    const likeCount = this.getLikeCount();
    const replyCount = this.getReplyCount();
    const createdAt = this.getCreatedAt();
    const isLiked = this.isCommentLiked();
    const parentComment = this.getParentComment();
    const updatedAt = this.getUpdatedAt();

    return new CommentOwner({
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

export type T_CommentOwnNoteConstructorParameters =
  T_CommentOwnConstructorParameters & {
    note: NoteOwn;
  };

export type T_CommentOwnNoteConstructorParametersJSON =
  T_CommentOwnConstructorParametersJSON & {
    note: T_NoteOwnConstructorParametersJSON;
  };

export class CommentOwnNote extends CommentOwn {
  readonly note: NoteOwn;
  constructor(data: {
    id: number;
    text: string;
    createdAt: Date;
    likeCount: number;
    replyCount: number;
    note: NoteOwn;
    isLiked: boolean;
    updatedAt: Date | null;
    parentComment: ParentComment | null;
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
    data: T_CommentOwnNoteConstructorParametersJSON
  ): CommentOwnNote {
    const note = NoteOwn.createFromJSON(data.note);
    const parentComment = data.parentComment
      ? ParentComment.createFromJSON(data.parentComment)
      : null;
    return new CommentOwnNote({ ...data, note, parentComment });
  }

  getNote(): NoteOwn {
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

export type T_CommentOwnVerseConstructorParameters =
  T_CommentOwnConstructorParameters & {
    verse: VerseUpperMean;
  };

export type T_CommentOwnVerseConstructorParametersJSON =
  T_CommentOwnConstructorParametersJSON & {
    verse: T_VerseUpperMeanConstructorParametersJSON;
  };

export class CommentOwnVerse extends CommentOwn {
  private readonly verse: VerseUpperMean;

  constructor(data: {
    id: number;
    text: string;
    createdAt: Readonly<Date>;
    likeCount: number;
    replyCount: number;
    verse: VerseUpperMean;
    isLiked: boolean;
    updatedAt: Date | null;
    parentComment: ParentComment | null;
  }) {
    super({ ...data });
    this.verse = data.verse;
  }

  static override createFromJSON(
    data: T_CommentOwnVerseConstructorParametersJSON
  ): CommentOwnVerse {
    const verse = VerseUpperMean.createFromJSON(data.verse);
    const parentComment = data.parentComment
      ? ParentComment.createFromJSON(data.parentComment)
      : null;
    return new CommentOwnVerse({ ...data, verse, parentComment });
  }

  getVerse(): VerseUpperMean {
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

export type T_CommentOwnerNoteConstructorParameters =
  T_CommentOwnConstructorParameters & {
    note: Readonly<NoteOwnerVerse>;
  };

export type T_CommentOwnerNoteConstructorParametersJSON =
  T_CommentOwnerConstructorParametersJSON & {
    note: T_NoteOwnerVerseConstructorParametersJSON;
  };

export class CommentOwnerNote extends CommentOwner {
  readonly note: NoteOwnerVerse;
  constructor(data: {
    id: number;
    text: string;
    createdAt: Readonly<Date>;
    likeCount: number;
    replyCount: number;
    note: NoteOwnerVerse;
    isLiked: boolean;
    creator: User;
    updatedAt: Readonly<Date> | null;
    parentComment: ParentComment | null;
  }) {
    super({ ...data });
    this.note = data.note;
  }

  static override createFromJSON(
    data: T_CommentOwnerNoteConstructorParametersJSON
  ): CommentOwnerNote {
    const parentComment = data.parentComment
      ? ParentComment.createFromJSON(data.parentComment)
      : null;
    const note = NoteOwnerVerse.createFromJSON(data.note);
    const creator = User.createFromJSON(data.note.creator);
    return new CommentOwnerNote({ ...data, parentComment, note, creator });
  }

  protected override increaseLikeCountAndGetClone() {
    this.setLikedCount(this.getLikeCount() + 1);
    return this.getClone();
  }

  protected override decreaseLikeCountAndGetClone() {
    this.setLikedCount(this.getLikeCount() + 1);
    return this.getClone();
  }

  getNote(): NoteOwnerVerse {
    return this.note;
  }
}

export type T_CommentOwnerVerseConstructorParameters =
  T_CommentOwnerConstructorParameters & {
    verse: VerseUpperMean;
  };

export type T_CommentOwnerVerseConstructorParametersJSON =
  T_CommentOwnerConstructorParametersJSON & {
    verse: T_VerseUpperMeanConstructorParametersJSON;
  };

export class CommentOwnerVerse extends CommentOwner {
  readonly verse: VerseUpperMean;
  constructor(data: T_CommentOwnerVerseConstructorParameters) {
    super({ ...data });
    this.verse = data.verse;
  }

  protected override getClone(): CommentOwnerVerse {
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

    return new CommentOwnerVerse({
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
    data: T_CommentOwnerVerseConstructorParametersJSON
  ): CommentOwnerVerse {
    const verse = VerseUpperMean.createFromJSON(data.verse);
    const creator = User.createFromJSON(data.creator);
    const parentComment = data.parentComment
      ? ParentComment.createFromJSON(data.parentComment)
      : null;
    return new CommentOwnerVerse({ ...data, verse, creator, parentComment });
  }

  protected override increaseLikeCountAndGetClone() {
    this.setLikedCount(this.getLikeCount() + 1);
    return this.getClone();
  }

  protected override decreaseLikeCountAndGetClone() {
    this.setLikedCount(this.getLikeCount() + 1);
    return this.getClone();
  }

  getVerse(): VerseUpperMean {
    return this.verse;
  }
}
