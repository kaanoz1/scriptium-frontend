export class FootNoteDTO {
  constructor(private readonly index: number, private readonly text: string) {}

  getIndex(): number {
    return this.index;
  }

  getText(): string {
    return this.text;
  }
}
