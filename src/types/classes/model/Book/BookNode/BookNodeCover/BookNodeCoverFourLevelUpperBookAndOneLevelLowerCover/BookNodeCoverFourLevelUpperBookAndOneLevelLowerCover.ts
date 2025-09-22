import {
  T_BookNodeCoverConstructorParameters,
  BookNodeCover,
  T_BookNodeCoverConstructorParametersJSON,
} from "../ BookNodeCover";
import { BookNodeMeaning } from "../../../BookNodeMeaning/BookNodeMeaning";
import {
  BookNodeCoverThreeLevelUpperBook,
  T_BookNodeCoverThreeLevelUpperBookConstructorParametersJSON,
} from "../BookNodeCoverThreeLevelUpperBook/BookNodeCoverThreeLevelUpperBook";

export type T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCoverThreeLevelUpperBook;
    nodes: Array<BookNodeCover>;
  };

export type T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverThreeLevelUpperBookConstructorParametersJSON;
    nodes: Array<T_BookNodeCoverConstructorParametersJSON>;
  };

export class BookNodeCoverFourLevelUpperBookAndOneLevelLower extends BookNodeCover {
  private readonly _parent: Readonly<BookNodeCoverThreeLevelUpperBook>;
  private readonly _nodes: ReadonlyArray<BookNodeCover>;

  constructor(
    data: T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerConstructorParameters
  ) {
    super({ ...data });
    this._nodes = data.nodes;
    this._parent = data.parent;
  }

  getParent() {
    return this._parent;
  }

  getNodes() {
    return this._nodes;
  }

  static override createFromJSON(
    data: T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerConstructorParametersJSON
  ): BookNodeCoverFourLevelUpperBookAndOneLevelLower {
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);
    const parent = BookNodeCoverThreeLevelUpperBook.createFromJSON(data.parent);
    const nodes = data.nodes.map(BookNodeCover.createFromJSON);
    return new BookNodeCoverFourLevelUpperBookAndOneLevelLower({
      ...data,
      meanings,
      parent,
      nodes,
    });
  }
}
