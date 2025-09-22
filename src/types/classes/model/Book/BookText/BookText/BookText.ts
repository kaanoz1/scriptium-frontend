import {
  BookTranslationText,
  T_BookTranslationTextConstructorParametersJSON,
} from "../../BookTranslationText/BookTranslationText/BookTranslationText";

export type T_BookTextConstructorParameters = {
  id: number;
  text: string;
  sequenceNumber: number;
  translationTexts: Array<BookTranslationText>;
};

export type T_BookTextConstructorParametersJSON = {
  id: number;
  text: string;
  sequenceNumber: number;
  translationTexts: Array<T_BookTranslationTextConstructorParametersJSON>;
};

export class BookText {
  private readonly _id: number;
  private readonly _text: string;
  private readonly _sequenceNumber: number;
  private readonly _translationTexts: ReadonlyArray<BookTranslationText>;

  constructor(data: T_BookTextConstructorParameters) {
    const { id, text, sequenceNumber, translationTexts } = data;
    this._id = id;
    this._text = text;
    this._sequenceNumber = sequenceNumber;
    this._translationTexts = translationTexts;
  }

  getId(): number {
    return this._id;
  }

  getText() {
    return this._text;
  }

  getSequenceNumber() {
    return this._sequenceNumber;
  }

  getTranslationTexts() {
    return this._translationTexts;
  }

  static createFromJSON(data: T_BookTextConstructorParametersJSON) {
    const translationTexts = data.translationTexts.map(
      BookTranslationText.createFromJSON
    );
    return new BookText({ ...data, translationTexts });
  }
}
