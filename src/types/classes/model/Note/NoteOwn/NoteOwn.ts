export type T_NoteOwnConstructorParameters = {
  id: number;
  text: string;
  createdAt: Readonly<Date>;
  updatedAt: Readonly<Date> | null;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
};

export type T_NoteOwnConstructorParametersJSON = {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date | null;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
};

export class NoteOwn {
  private readonly id: number;
  private text: string;
  private readonly createdAt: Readonly<Date>;
  private updatedAt: Date | null;
  private likeCount: number;
  private readonly replyCount: number;
  private isLiked: boolean = false;

  constructor(data: T_NoteOwnConstructorParameters) {
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

  static createFromJSON(data: T_NoteOwnConstructorParametersJSON): NoteOwn {
    const createdAt = new Date(data.createdAt);
    const updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
    return new NoteOwn({ ...data, createdAt, updatedAt });
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
