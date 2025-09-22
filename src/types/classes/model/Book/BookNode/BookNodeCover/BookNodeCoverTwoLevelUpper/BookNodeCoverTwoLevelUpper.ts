import {
  T_BookNodeCoverConstructorParameters,
  T_BookNodeCoverConstructorParametersJSON,
  BookNodeCover,
} from "../ BookNodeCover";
import { BookNodeMeaning } from "../../../BookNodeMeaning/BookNodeMeaning";
import {
  BookNodeCoverOneLevelUpper,
  T_BookNodeCoverOneLevelUpperConstructorParametersJSON,
} from "../BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpper";

export type T_BookNodeCoverTwoLevelUpperConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCoverOneLevelUpper;
  };

export type T_BookNodeCoverTwoLevelUpperConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverOneLevelUpperConstructorParametersJSON;
  };

export class BookNodeCoverTwoLevelUpper extends BookNodeCover {
  private readonly _parent: Readonly<BookNodeCoverOneLevelUpper>;

  constructor(data: T_BookNodeCoverTwoLevelUpperConstructorParameters) {
    super({ ...data });
    this._parent = data.parent;
  }

  getParent() {
    return this._parent;
  }

  static override createFromJSON(
    data: T_BookNodeCoverTwoLevelUpperConstructorParametersJSON
  ): BookNodeCoverTwoLevelUpper {
    const parent = BookNodeCoverOneLevelUpper.createFromJSON(data.parent);
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);

    return new BookNodeCoverTwoLevelUpper({ ...data, parent, meanings });
  }
}
