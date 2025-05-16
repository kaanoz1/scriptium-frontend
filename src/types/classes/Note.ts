import { UserDTO } from "./User";
import { VerseUpperMeanDTO } from "./Verse";

export class NoteOwnDTO {
  constructor(
    private readonly id: number,
    private readonly text: string,
    private readonly createdAt: Readonly<Date>,
    private readonly updatedAt: Readonly<Date> | null,
    private likeCount: number,
    private readonly replyCount: number,
    private isLiked: boolean = false,
    private readonly _verse: Readonly<VerseUpperMeanDTO>
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

  setLikeCount(likeCount: number): void {
    this.likeCount = likeCount;
  }

  getReplyCount(): number {
    return this.replyCount;
  }

  isNoteLiked(): boolean {
    return this.isLiked;
  }

  setIsNoteLiked(isLiked: boolean): void {
    this.isLiked = isLiked;
  }

  getVerse(): Readonly<VerseUpperMeanDTO> {
    return this._verse;
  }
}

export class NoteOwnerDTO extends NoteOwnDTO {
  constructor(
    id: number,
    text: string,
    createdAt: Readonly<Date>,
    updatedAt: Readonly<Date> | null,
    likeCount: number,
    replyCount: number,
    private readonly creator: Readonly<UserDTO>,
    isLiked: boolean = false,
    verse: VerseUpperMeanDTO
  ) {
    super(
      id,
      text,
      createdAt,
      updatedAt,
      likeCount,
      replyCount,
      isLiked,
      verse
    );
  }

  getCreator(): Readonly<UserDTO> {
    return this.creator;
  }
}
