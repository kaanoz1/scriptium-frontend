import { BookNodeCover } from "../../ BookNodeCover";
import {
  T_BookCoverConstructorParameters,
  BookCover,
  T_BookCoverConstructorParametersJSON,
} from "../../../../Book/BookCover/BookCover";
import { BookNodeMeaning } from "../../../../BookNodeMeaning/BookNodeMeaning";

export type T_BookNodeCoverOneLevelUpperBookConstructorParameters =
  T_BookCoverConstructorParameters & {
    book: BookCover;
  };

export type T_BookNodeCoverOneLevelUpperBookConstructorParametersJSON =
  T_BookCoverConstructorParametersJSON & {
    book: T_BookCoverConstructorParametersJSON;
  };

export class BookNodeCoverOneLevelUpperBook extends BookNodeCover {
  private readonly _book: BookCover;

  constructor(data: T_BookNodeCoverOneLevelUpperBookConstructorParameters) {
    super({ ...data });
    this._book = data.book;
  }

  getBook() {
    return this._book;
  }
  static override createFromJSON(
    data: T_BookNodeCoverOneLevelUpperBookConstructorParametersJSON
  ): BookNodeCoverOneLevelUpperBook {
    const book = BookCover.createFromJSON(data.book);
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);

    return new BookNodeCoverOneLevelUpperBook({ ...data, book, meanings });
  }
}
