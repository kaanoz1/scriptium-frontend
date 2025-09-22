import {
  T_BookNodeCoverConstructorParameters,
  BookNodeCover,
  T_BookNodeCoverConstructorParametersJSON,
} from "../ BookNodeCover";
import { BookNodeMeaning } from "../../../BookNodeMeaning/BookNodeMeaning";

export type T_BookNodeCoverOneLevelUpperConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCover;
  };

export type T_BookNodeCoverOneLevelUpperConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverConstructorParametersJSON;
  };

export class BookNodeCoverOneLevelUpper extends BookNodeCover {
  private readonly _parent: BookNodeCover;

  constructor(data: T_BookNodeCoverOneLevelUpperConstructorParameters) {
    super({ ...data });
    this._parent = data.parent;
  }

  getParent() {
    return this._parent;
  }

  static override createFromJSON(
    data: T_BookNodeCoverOneLevelUpperConstructorParametersJSON
  ): BookNodeCoverOneLevelUpper {
    const parent = BookNodeCover.createFromJSON(data.parent);
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);

    return new BookNodeCoverOneLevelUpper({ ...data, parent, meanings });
  }
}
