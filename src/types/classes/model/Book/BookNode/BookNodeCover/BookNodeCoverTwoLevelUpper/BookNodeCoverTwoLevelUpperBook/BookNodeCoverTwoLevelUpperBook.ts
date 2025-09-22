import {
  T_BookNodeCoverConstructorParameters,
  T_BookNodeCoverConstructorParametersJSON,
  BookNodeCover,
} from "../../ BookNodeCover";
import { BookNodeMeaning } from "../../../../BookNodeMeaning/BookNodeMeaning";
import {
  BookNodeCoverOneLevelUpperBook,
  T_BookNodeCoverOneLevelUpperBookConstructorParametersJSON,
} from "../../BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBook/BookNodeCoverOneLevelUpperBook";

export type T_BookNodeCoverTwoLevelUpperBookConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCoverOneLevelUpperBook;
  };

export type T_BookNodeCoverTwoLevelUpperBookConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverOneLevelUpperBookConstructorParametersJSON;
  };

export class BookNodeCoverTwoLevelUpperBook extends BookNodeCover {
  private readonly _parent: Readonly<BookNodeCoverOneLevelUpperBook>;

  constructor(data: T_BookNodeCoverTwoLevelUpperBookConstructorParameters) {
    super({ ...data });
    this._parent = data.parent;
  }

  getParent() {
    return this._parent;
  }

  static override createFromJSON(
    data: T_BookNodeCoverTwoLevelUpperBookConstructorParametersJSON
  ): BookNodeCoverTwoLevelUpperBook {
    const parent = BookNodeCoverOneLevelUpperBook.createFromJSON(data.parent);
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);

    return new BookNodeCoverTwoLevelUpperBook({ ...data, parent, meanings });
  }
}
