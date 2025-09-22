import {
  T_BookNodeCoverConstructorParameters,
  T_BookNodeCoverConstructorParametersJSON,
  BookNodeCover,
} from "../ BookNodeCover";
import { BookNodeMeaning } from "../../../BookNodeMeaning/BookNodeMeaning";
import {
  BookNodeCoverThreeLevelUpperBook,
  T_BookNodeCoverThreeLevelUpperBookConstructorParametersJSON,
} from "../BookNodeCoverThreeLevelUpperBook/BookNodeCoverThreeLevelUpperBook";

export type T_BookNodeCoverFourLevelUpperBookConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCoverThreeLevelUpperBook;
  };

export type T_BookNodeCoverFourLevelUpperBookConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverThreeLevelUpperBookConstructorParametersJSON;
  };

export class BookNodeCoverFourLevelUpperBook extends BookNodeCover {
  private readonly _parent: Readonly<BookNodeCoverThreeLevelUpperBook>;

  constructor(data: T_BookNodeCoverFourLevelUpperBookConstructorParameters) {
    super({ ...data });
    this._parent = data.parent;
  }

  getParent() {
    return this._parent;
  }

  static override createFromJSON(
    data: T_BookNodeCoverFourLevelUpperBookConstructorParametersJSON
  ): BookNodeCoverFourLevelUpperBook {
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);
    const parent = BookNodeCoverThreeLevelUpperBook.createFromJSON(data.parent);
    return new BookNodeCoverFourLevelUpperBook({ ...data, meanings, parent });
  }
}
