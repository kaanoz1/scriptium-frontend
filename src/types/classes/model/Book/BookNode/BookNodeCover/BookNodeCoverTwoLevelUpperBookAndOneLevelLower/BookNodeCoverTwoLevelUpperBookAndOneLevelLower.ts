import {
  T_BookNodeCoverConstructorParameters,
  BookNodeCover,
  T_BookNodeCoverConstructorParametersJSON,
} from "../ BookNodeCover";
import { BookNodeMeaning } from "../../../BookNodeMeaning/BookNodeMeaning";
import {
  BookNodeCoverOneLevelUpperBook,
  T_BookNodeCoverOneLevelUpperBookConstructorParametersJSON,
} from "../BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBook/BookNodeCoverOneLevelUpperBook";

export type T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCoverOneLevelUpperBook;
    nodes: Array<BookNodeCover>;
  };

export type T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverOneLevelUpperBookConstructorParametersJSON;
    nodes: Array<T_BookNodeCoverConstructorParametersJSON>;
  };

export class BookNodeCoverTwoLevelUpperBookAndOneLevelLower extends BookNodeCover {
  private readonly _parent: Readonly<BookNodeCoverOneLevelUpperBook>;
  private readonly _nodes: ReadonlyArray<BookNodeCover>;

  constructor(
    data: T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerConstructorParameters
  ) {
    super({ ...data });
    this._parent = data.parent;
    this._nodes = data.nodes;
  }

  getParent() {
    return this._parent;
  }

  getNodes() {
    return this._nodes;
  }

  static override createFromJSON(
    data: T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerConstructorParametersJSON
  ): BookNodeCoverTwoLevelUpperBookAndOneLevelLower {
    const parent = BookNodeCoverOneLevelUpperBook.createFromJSON(data.parent);
    const nodes = data.nodes.map(BookNodeCover.createFromJSON);
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);

    return new BookNodeCoverTwoLevelUpperBookAndOneLevelLower({
      ...data,
      parent,
      nodes,
      meanings,
    });
  }
}
