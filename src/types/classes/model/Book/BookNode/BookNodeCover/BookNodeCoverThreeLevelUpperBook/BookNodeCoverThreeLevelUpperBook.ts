import {
  T_BookNodeCoverConstructorParameters,
  T_BookNodeCoverConstructorParametersJSON,
  BookNodeCover,
} from "../ BookNodeCover";
import { BookNodeMeaning } from "../../../BookNodeMeaning/BookNodeMeaning";
import {
  BookNodeCoverTwoLevelUpperBook,
  T_BookNodeCoverTwoLevelUpperBookConstructorParametersJSON,
} from "../BookNodeCoverTwoLevelUpper/BookNodeCoverTwoLevelUpperBook/BookNodeCoverTwoLevelUpperBook";

export type T_BookNodeCoverThreeLevelUpperBookConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCoverTwoLevelUpperBook;
  };

export type T_BookNodeCoverThreeLevelUpperBookConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverTwoLevelUpperBookConstructorParametersJSON;
  };

export class BookNodeCoverThreeLevelUpperBook extends BookNodeCover {
  private readonly _parent: Readonly<BookNodeCoverTwoLevelUpperBook>;

  constructor(data: T_BookNodeCoverThreeLevelUpperBookConstructorParameters) {
    super({ ...data });
    this._parent = data.parent;
  }

  getParent() {
    return this._parent;
  }

  static override createFromJSON(
    data: T_BookNodeCoverThreeLevelUpperBookConstructorParametersJSON
  ): BookNodeCoverThreeLevelUpperBook {
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);
    const parent = BookNodeCoverTwoLevelUpperBook.createFromJSON(data.parent);
    return new BookNodeCoverThreeLevelUpperBook({ ...data, meanings, parent });
  }
}
