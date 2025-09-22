import {
  T_BookNodeCoverConstructorParameters,
  BookNodeCover,
  T_BookNodeCoverConstructorParametersJSON,
} from "../ BookNodeCover";
import { BookNodeMeaning } from "../../../BookNodeMeaning/BookNodeMeaning";
import {
  BookNodeCoverTwoLevelUpperBook,
  T_BookNodeCoverTwoLevelUpperBookConstructorParametersJSON,
} from "../BookNodeCoverTwoLevelUpper/BookNodeCoverTwoLevelUpperBook/BookNodeCoverTwoLevelUpperBook";

export type T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCoverTwoLevelUpperBook;
    nodes: Array<BookNodeCover>;
  };

export type T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverTwoLevelUpperBookConstructorParametersJSON;
    nodes: Array<T_BookNodeCoverConstructorParametersJSON>;
  };

export class BookNodeCoverThreeLevelUpperBookAndOneLevelLower extends BookNodeCover {
  private readonly _parent: Readonly<BookNodeCoverTwoLevelUpperBook>;
  private readonly _nodes: ReadonlyArray<BookNodeCover>;

  constructor(
    data: T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerConstructorParameters
  ) {
    super({ ...data });
    this._nodes = data.nodes;
    this._parent = data.parent;
  }

  getNodes() {
    return this._nodes;
  }

  getParent() {
    return this._parent;
  }

  static override createFromJSON(
    data: T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerConstructorParametersJSON
  ): BookNodeCoverThreeLevelUpperBookAndOneLevelLower {
    const parent = BookNodeCoverTwoLevelUpperBook.createFromJSON(data.parent);
    const nodes = data.nodes.map(BookNodeCover.createFromJSON);
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);
    return new BookNodeCoverThreeLevelUpperBookAndOneLevelLower({
      ...data,
      parent,
      nodes,
      meanings,
    });
  }
}
