import {
  BookCover,
  T_BookCoverConstructorParametersJSON,
} from "@/types/classes/model/Book/Book/BookCover/BookCover";
import { BookNodeMeaning } from "@/types/classes/model/Book/BookNodeMeaning/BookNodeMeaning";
import {
  BookText,
  T_BookTextConstructorParametersJSON,
} from "@/types/classes/model/Book/BookText/BookText/BookText";
import {
  T_BookNodeCoverConstructorParameters,
  T_BookNodeCoverConstructorParametersJSON,
  BookNodeCover,
} from "../../../ BookNodeCover";

export type T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerTextConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    book: BookCover;
    texts: Array<BookText>;
  };

export type T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    book: T_BookCoverConstructorParametersJSON;
    texts: Array<T_BookTextConstructorParametersJSON>;
  };

export class BookNodeCoverOneLevelUpperBookAndOneLevelLowerText extends BookNodeCover {
  private readonly _book: Readonly<BookCover>;
  private readonly _texts: ReadonlyArray<BookText>;

  constructor(
    data: T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerTextConstructorParameters
  ) {
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
    data: T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON
  ): BookNodeCoverOneLevelUpperBookAndOneLevelLowerText {
    const book = BookCover.createFromJSON(data.book);
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);
    const texts = data.texts.map(BookText.createFromJSON);
    return new BookNodeCoverOneLevelUpperBookAndOneLevelLowerText({
      ...data,
      book,
      meanings,
      texts,
    });
  }
}
