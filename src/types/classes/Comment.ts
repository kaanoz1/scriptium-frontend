import { NoteOwnDTO, NoteOwnerDTO } from "./Note";
import { UserDTO } from "./User";
import { VerseUpperConfinedDTO } from "./Verse";

export class CommentBaseDTO {
  constructor(
    private readonly id: number,
    private readonly text: string,
    private readonly createdAt: Readonly<Date>,
    private readonly likeCount: number,
    private readonly replyCount: number,
    private readonly isLiked: boolean = false,
    private readonly updatedAt: Readonly<Date> | null = null
  ) {}

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

  getReplyCount(): number {
    return this.replyCount;
  }

  isCommentLiked(): boolean {
    return this.isLiked;
  }
}

export class ParentCommentDTO extends CommentBaseDTO {
  constructor(
    id: number,
    text: string,
    createdAt: Readonly<Date>,
    likeCount: number,
    replyCount: number,
    isLiked: boolean = false,
    updatedAt: Readonly<Date> | null = null,
    private readonly user: Readonly<UserDTO> | null = null
  ) {
    super(id, text, createdAt, likeCount, replyCount, isLiked, updatedAt);
  }

  getUser(): Readonly<UserDTO> | null {
    return this.user;
  }
}

export class CommentOwnDTO extends CommentBaseDTO {
  constructor(
    id: number,
    text: string,
    createdAt: Readonly<Date>,
    likeCount: number,
    replyCount: number,
    isLiked: boolean = false,
    updatedAt: Readonly<Date> | null = null,
    private readonly parentComment: Readonly<ParentCommentDTO> | null = null
  ) {
    super(id, text, createdAt, likeCount, replyCount, isLiked, updatedAt);
  }

  getParentComment(): Readonly<ParentCommentDTO> | null {
    return this.parentComment;
  }
}

export abstract class CommentOwnerDTO extends CommentOwnDTO {
  constructor(
    id: number,
    text: string,
    createdAt: Readonly<Date>,
    likeCount: number,
    replyCount: number,
    private readonly creator: Readonly<UserDTO>,
    isLiked: boolean = false,
    updatedAt: Readonly<Date> | null = null,
    parentComment: Readonly<ParentCommentDTO> | null = null
  ) {
    super(
      id,
      text,
      createdAt,
      likeCount,
      replyCount,
      isLiked,
      updatedAt,
      parentComment
    );
  }

  getCreator(): Readonly<UserDTO> {
    return this.creator;
  }
}

export class CommentOwnNoteDTO extends CommentOwnDTO {
  constructor(
    id: number,
    text: string,
    createdAt: Readonly<Date>,
    likeCount: number,
    replyCount: number,
    private readonly note: NoteOwnDTO,
    isLiked: boolean = false,
    updatedAt: Readonly<Date> | null = null,
    parentComment: Readonly<ParentCommentDTO> | null = null
  ) {
    super(
      id,
      text,
      createdAt,
      likeCount,
      replyCount,
      isLiked,
      updatedAt,
      parentComment
    );
  }

  getNote(): NoteOwnDTO {
    return this.note;
  }
}

export class CommentOwnVerseDTO extends CommentOwnDTO {
  constructor(
    id: number,
    text: string,
    createdAt: Readonly<Date>,
    likeCount: number,
    replyCount: number,
    private readonly verse: Readonly<VerseUpperConfinedDTO>,
    isLiked: boolean = false,
    updatedAt: Readonly<Date> | null = null,
    parentComment: Readonly<ParentCommentDTO> | null = null
  ) {
    super(
      id,
      text,
      createdAt,
      likeCount,
      replyCount,
      isLiked,
      updatedAt,
      parentComment
    );
  }

  getVerse(): Readonly<VerseUpperConfinedDTO> {
    return this.verse;
  }
}

export class CommentOwnerNoteDTO extends CommentOwnerDTO {
  constructor(
    id: number,
    text: string,
    createdAt: Readonly<Date>,
    likeCount: number,
    replyCount: number,
    private readonly note: Readonly<NoteOwnerDTO>,
    creator: Readonly<UserDTO>,
    isLiked: boolean = false,
    updatedAt: Readonly<Date> | null = null,
    parentComment: Readonly<ParentCommentDTO> | null = null
  ) {
    super(
      id,
      text,
      createdAt,
      likeCount,
      replyCount,
      creator,
      isLiked,
      updatedAt,
      parentComment
    );
  }

  getNote(): Readonly<NoteOwnerDTO> {
    return this.note;
  }
}

export class CommentOwnerVerseDTO extends CommentOwnerDTO {
  constructor(
    id: number,
    text: string,
    createdAt: Readonly<Date>,
    likeCount: number,
    replyCount: number,
    private readonly verse: Readonly<VerseUpperConfinedDTO>,
    creator: Readonly<UserDTO>,
    isLiked: boolean = false,
    updatedAt: Readonly<Date> | null = null,
    parentComment: Readonly<ParentCommentDTO> | null = null
  ) {
    super(
      id,
      text,
      createdAt,
      likeCount,
      replyCount,
      creator,
      isLiked,
      updatedAt,
      parentComment
    );
  }

  getVerse(): Readonly<VerseUpperConfinedDTO> {
    return this.verse;
  }
}
