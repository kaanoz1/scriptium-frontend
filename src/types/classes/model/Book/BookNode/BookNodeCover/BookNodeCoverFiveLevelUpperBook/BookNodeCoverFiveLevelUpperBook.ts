import {
  T_BookNodeCoverConstructorParameters,
  T_BookNodeCoverConstructorParametersJSON,
  BookNodeCover,
} from "../ BookNodeCover";
import { BookNodeMeaning } from "../../../BookNodeMeaning/BookNodeMeaning";
import {
  BookNodeCoverFourLevelUpperBook,
  T_BookNodeCoverFourLevelUpperBookConstructorParametersJSON,
} from "../BookNodeCoverFourLevelUpperBook/BookNodeCoverFourLevelUpperBook";

export type T_BookNodeCoverFiveLevelUpperBookConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCoverFourLevelUpperBook;
  };

export type T_BookNodeCoverFiveLevelUpperBookConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverFourLevelUpperBookConstructorParametersJSON;
  };

export class BookNodeCoverFiveLevelUpperBook extends BookNodeCover {
  private readonly _parent: Readonly<BookNodeCoverFourLevelUpperBook>;

  constructor(data: T_BookNodeCoverFiveLevelUpperBookConstructorParameters) {
    super({ ...data });
    this._parent = data.parent;
  }

  getParent() {
    return this._parent;
  }

  static override createFromJSON(
    data: T_BookNodeCoverFiveLevelUpperBookConstructorParametersJSON
  ): BookNodeCoverFiveLevelUpperBook {
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);
    const parent = BookNodeCoverFourLevelUpperBook.createFromJSON(data.parent);
    return new BookNodeCoverFiveLevelUpperBook({ ...data, meanings, parent });
  }
}
