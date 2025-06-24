import {
  NoteOwnDTO,
  NoteOwnerDTO,
  T_NoteOwnDTOConstructorParametersJSON,
  T_NoteOwnerDTOConstructorParametersJSON,
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
  updatedAt: Date;
};

export type T_CommentBaseDTOConstructorParametersJSON = {
  id: number;
  text: string;
  createdAt: Date;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
  updatedAt: Date;
};

export class CommentBaseDTO {
  private readonly id: number;
  private readonly text: string;
  private readonly createdAt: Date;
  private readonly likeCount: number;
  private readonly replyCount: number;
  private readonly isLiked: boolean = false;
  private readonly updatedAt: Date | null = null;

  constructor(data: {
    id: number;
    text: string;
    createdAt: Date;
    likeCount: number;
    replyCount: number;
    isLiked: boolean;
    updatedAt: Date | null;
  }) {
    const { id, text, createdAt, likeCount, replyCount, isLiked, updatedAt } =
      data;
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
    this.likeCount = likeCount;
    this.replyCount = replyCount;
    this.isLiked = isLiked;
    this.updatedAt = updatedAt;
  }

  static createFromJSON(
    data: T_CommentBaseDTOConstructorParametersJSON
  ): CommentBaseDTO {
    return new CommentBaseDTO({ ...data });
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

  getReplyCount(): number {
    return this.replyCount;
  }

  isCommentLiked(): boolean {
    return this.isLiked;
  }
}

export type T_ParentCommentDTOConstructorParameters =
  T_CommentBaseDTOConstructorParameters & { user: Readonly<UserDTO> };

export type T_ParentCommentDTOConstructorParametersJSON =
  T_CommentBaseDTOConstructorParametersJSON & {
    user: T_UserDTOConstructorParametersJSON;
  };

export class ParentCommentDTO extends CommentBaseDTO {
  readonly user: Readonly<UserDTO> | null = null;

  constructor(data: {
    id: number;
    text: string;
    createdAt: Date;
    likeCount: number;
    replyCount: number;
    isLiked: boolean;
    updatedAt: Date | null;
    user: Readonly<UserDTO>;
  }) {
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
    parentComment: Readonly<ParentCommentDTO>;
  };

export type T_CommentOwnDTOConstructorParametersJSON =
  T_CommentBaseDTOConstructorParametersJSON & {
    parentComment: T_ParentCommentDTOConstructorParametersJSON;
  };

export class CommentOwnDTO extends CommentBaseDTO {
  readonly parentComment: Readonly<ParentCommentDTO> | null = null;
  constructor(data: {
    id: number;
    text: string;
    createdAt: Readonly<Date>;
    likeCount: number;
    replyCount: number;
    isLiked: boolean;
    updatedAt: Date | null;
    parentComment: ParentCommentDTO | null;
  }) {
    super({ ...data });
    this.parentComment = data.parentComment;
  }

  static override createFromJSON(
    data: T_CommentOwnDTOConstructorParametersJSON
  ): CommentOwnDTO {
    const parentComment = ParentCommentDTO.createFromJSON(data.parentComment);
    return new CommentOwnDTO({ ...data, parentComment });
  }

  getParentComment(): Readonly<ParentCommentDTO> | null {
    return this.parentComment;
  }
}

export type T_CommentOwnerDTOConstructorParameters =
  T_CommentOwnDTOConstructorParameters & {
    creator: Readonly<UserDTO>;
  };

export type T_CommentOwnerDTOConstructorParametersJSON =
  T_CommentOwnDTOConstructorParametersJSON & {
    creator: T_UserDTOConstructorParametersJSON;
  };

export abstract class CommentOwnerDTO extends CommentOwnDTO {
  readonly creator: Readonly<UserDTO>;

  constructor(data: {
    id: number;
    text: string;
    createdAt: Readonly<Date>;
    likeCount: number;
    replyCount: number;
    isLiked: boolean;
    updatedAt: Readonly<Date> | null;
    readonly creator: Readonly<UserDTO>;
    parentComment: ParentCommentDTO | null;
  }) {
    super({ ...data });

    this.creator = data.creator;
  }

  getCreator(): Readonly<UserDTO> {
    return this.creator;
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

  static override createFromJSON(
    data: T_CommentOwnNoteDTOConstructorParametersJSON
  ): CommentOwnNoteDTO {
    const note = NoteOwnDTO.createFromJSON(data.note);
    const parentComment = ParentCommentDTO.createFromJSON(data.parentComment);
    return new CommentOwnNoteDTO({ ...data, note, parentComment });
  }

  getNote(): NoteOwnDTO {
    return this.note;
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
    const parentComment = ParentCommentDTO.createFromJSON(data.parentComment);
    return new CommentOwnVerseDTO({ ...data, verse, parentComment });
  }

  getVerse(): VerseUpperMeanDTO {
    return this.verse;
  }
}

export type T_CommentOwnerNoteDTOConstructorParameters =
  T_CommentOwnDTOConstructorParameters & {
    note: Readonly<NoteOwnerDTO>;
  };

export type T_CommentOwnerNoteDTOConstructorParametersJSON =
  T_CommentOwnerDTOConstructorParametersJSON & {
    note: T_NoteOwnerDTOConstructorParametersJSON;
  };

export class CommentOwnerNoteDTO extends CommentOwnerDTO {
  readonly note: NoteOwnerDTO;
  constructor(data: {
    id: number;
    text: string;
    createdAt: Readonly<Date>;
    likeCount: number;
    replyCount: number;
    note: NoteOwnerDTO;
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
    const parentComment = ParentCommentDTO.createFromJSON(data.parentComment);
    const note = NoteOwnerDTO.createFromJSON(data.note);
    const creator = UserDTO.createFromJSON(data.note.creator);
    return new CommentOwnerNoteDTO({ ...data, parentComment, note, creator });
  }

  getNote(): NoteOwnerDTO {
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
  constructor(data: {
    id: number;
    text: string;
    createdAt: Readonly<Date>;
    likeCount: number;
    replyCount: number;
    verse: VerseUpperMeanDTO;
    creator: Readonly<UserDTO>;
    isLiked: boolean;
    updatedAt: Readonly<Date> | null;
    parentComment: ParentCommentDTO | null;
  }) {
    super({ ...data });
    this.verse = data.verse;
  }

  static override createFromJSON(
    data: T_CommentOwnerVerseDTOConstructorParametersJSON
  ): CommentOwnerVerseDTO {
    const verse = VerseUpperMeanDTO.createFromJSON(data.verse);
    const creator = UserDTO.createFromJSON(data.creator);
    const parentComment = ParentCommentDTO.createFromJSON(data.parentComment);
    return new CommentOwnerVerseDTO({ ...data, verse, creator, parentComment });
  }

  getVerse(): VerseUpperMeanDTO {
    return this.verse;
  }
}
