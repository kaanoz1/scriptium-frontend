import {
  BookTranslation,
  T_BookTranslationConstructorParametersJSON,
} from "../../BookTranslation/BookTranslation/BookTranslation";
import {
  BookTranslationTextFootNote,
  T_BookTranslationTextFootNoteConstructorParametersJSON,
} from "../../BookTranslationTextFootnote/BookTranslationTextFootnote/BookTranslationTextFootnote";

export type T_BookTranslationTextConstructorParameters = {
  text: string;
  translation: BookTranslation;
  footnotes: Array<BookTranslationTextFootNote>;
};

export type T_BookTranslationTextConstructorParametersJSON = {
  text: string;
  translation: T_BookTranslationConstructorParametersJSON;
  footnotes: Array<T_BookTranslationTextFootNoteConstructorParametersJSON>;
};

export class BookTranslationText {
  private readonly _text: string;
  private readonly _translation: Readonly<BookTranslation>;
  private readonly _footnotes: ReadonlyArray<BookTranslationTextFootNote>;

  constructor(data: T_BookTranslationTextConstructorParameters) {
    this._text = data.text;
    this._translation = data.translation;
    this._footnotes = data.footnotes;
  }

  getText() {
    return this._text;
  }

  getTranslation() {
    return this._translation;
  }

  getFootnotes() {
    return this._footnotes;
  }

  static createFromJSON(data: T_BookTranslationTextConstructorParametersJSON) {
    const translation = BookTranslation.createFromJSON(data.translation);
    const footnotes = data.footnotes.map(
      BookTranslationTextFootNote.createFromJSON
    );
    return new BookTranslationText({ ...data, translation, footnotes });
  }
}
