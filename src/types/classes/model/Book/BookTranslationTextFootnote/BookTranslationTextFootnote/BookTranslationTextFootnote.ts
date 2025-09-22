export type T_BookTranslationTextFootNoteConstructorParameters = {
  indicator: string;
  index: number;
  text: string;
};

export type T_BookTranslationTextFootNoteConstructorParametersJSON = {
  indicator: string;
  index: number;
  text: string;
};

export class BookTranslationTextFootNote {
  private readonly _indicator: string;
  private readonly _index: number;
  private readonly _text: string;

  constructor(data: T_BookTranslationTextFootNoteConstructorParameters) {
    const { indicator, index, text } = data;
    this._index = index;
    this._indicator = indicator;
    this._text = text;
  }

  getText() {
    return this._text;
  }

  getIndex() {
    return this._index;
  }

  getIndicator() {
    return this._indicator;
  }

  static createFromJSON(
    data: T_BookTranslationTextFootNoteConstructorParametersJSON
  ) {
    return new BookTranslationTextFootNote({ ...data });
  }
}
