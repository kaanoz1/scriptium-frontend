import {
  T_BookNodeCoverConstructorParameters,
  T_BookNodeCoverConstructorParametersJSON,
  BookNodeCover,
} from "../ BookNodeCover";
import { BookNodeMeaning } from "../../../BookNodeMeaning/BookNodeMeaning";
import {
  BookNodeCoverTwoLevelUpper,
  T_BookNodeCoverTwoLevelUpperConstructorParametersJSON,
} from "../BookNodeCoverTwoLevelUpper/BookNodeCoverTwoLevelUpper";

export type T_BookNodeCoverThreeLevelUpperConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCoverTwoLevelUpper;
  };

export type T_BookNodeCoverThreeLevelUpperConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverTwoLevelUpperConstructorParametersJSON;
  };

export class BookNodeCoverThreeLevelUpper extends BookNodeCover {
  private readonly _parent: Readonly<BookNodeCoverTwoLevelUpper>;

  constructor(data: T_BookNodeCoverThreeLevelUpperConstructorParameters) {
    super({ ...data });
    this._parent = data.parent;
  }

  getParent() {
    return this._parent;
  }

  static override createFromJSON(
    data: T_BookNodeCoverThreeLevelUpperConstructorParametersJSON
  ): BookNodeCoverThreeLevelUpper {
    const parent = BookNodeCoverTwoLevelUpper.createFromJSON(data.parent);
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);

    return new BookNodeCoverThreeLevelUpper({ ...data, parent, meanings });
  }
}
