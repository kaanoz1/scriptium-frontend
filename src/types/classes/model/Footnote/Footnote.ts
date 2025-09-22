export type T_FootnoteParams = {
  index: number;
  text: string;
};

export type T_FootnoteConstructorParametersJSON = T_FootnoteParams;

export class Footnote {
  private readonly index: number;
  private readonly text: string;

  constructor(data: T_FootnoteParams) {
    this.text = data.text;
    this.index = data.index;
  }

  static createFromJSON(data: T_FootnoteConstructorParametersJSON): Footnote {
    return new Footnote({ ...data });
  }

  getIndex(): number {
    return this.index;
  }

  getText(): string {
    return this.text;
  }
}
