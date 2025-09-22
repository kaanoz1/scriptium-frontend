import {
  T_BookNodeCoverConstructorParameters,
  T_BookNodeCoverConstructorParametersJSON,
  BookNodeCover,
} from "../../ BookNodeCover";
import {
  BookCover,
  T_BookCoverConstructorParametersJSON,
} from "../../../../Book/BookCover/BookCover";
import { BookNodeMeaning } from "../../../../BookNodeMeaning/BookNodeMeaning";
import {
  BookText,
  T_BookTextConstructorParametersJSON,
} from "../../../../BookText/BookText/BookText";

export type T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerText =
  T_BookNodeCoverConstructorParameters & {
    book: BookCover;
    texts: Array<BookText>;
  };

export type T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerTextJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    book: T_BookCoverConstructorParametersJSON;
    texts: Array<T_BookTextConstructorParametersJSON>;
  };

export class BookNodeCoverOneLevelUpperBookAndOneLevelLowerText extends BookNodeCover {
  private readonly _book: Readonly<BookCover>;
  private readonly _texts: ReadonlyArray<BookText>;

  constructor(data: T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerText) {
    super({ ...data });
    this._book = data.book;
    this._texts = data.texts;
  }

  getBook() {
    return this._book;
  }

  getTexts() {
    return this._texts;
  }

  static override createFromJSON(
    data: T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerTextJSON
  ): BookNodeCoverOneLevelUpperBookAndOneLevelLowerText {
    const book = BookCover.createFromJSON(data.book);
    const texts = data.texts.map(BookText.createFromJSON);
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);

    return new BookNodeCoverOneLevelUpperBookAndOneLevelLowerText({
      ...data,
      book,
      texts,
      meanings,
    });
  }
}
