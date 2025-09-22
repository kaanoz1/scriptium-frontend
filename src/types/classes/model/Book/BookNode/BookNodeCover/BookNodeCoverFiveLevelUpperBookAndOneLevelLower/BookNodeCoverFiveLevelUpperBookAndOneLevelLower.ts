import {
  T_BookNodeCoverConstructorParameters,
  BookNodeCover,
  T_BookNodeCoverConstructorParametersJSON,
} from "../ BookNodeCover";
import { BookNodeMeaning } from "../../../BookNodeMeaning/BookNodeMeaning";
import {
  BookNodeCoverFourLevelUpperBook,
  T_BookNodeCoverFourLevelUpperBookConstructorParametersJSON,
} from "../BookNodeCoverFourLevelUpperBook/BookNodeCoverFourLevelUpperBook";

export type T_BookNodeCoverFiveLevelUpperBookAndOneLevelLowerConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCoverFourLevelUpperBook;
    nodes: Array<BookNodeCover>;
  };

export type T_BookNodeCoverFiveLevelUpperBookAndOneLevelLowerConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverFourLevelUpperBookConstructorParametersJSON;
    nodes: Array<T_BookNodeCoverConstructorParametersJSON>;
  };

export class BookNodeCoverFiveLevelUpperBookAndOneLevelLower extends BookNodeCover {
  private readonly _parent: Readonly<BookNodeCoverFourLevelUpperBook>;
  private readonly _nodes: ReadonlyArray<BookNodeCover>;

  constructor(
    data: T_BookNodeCoverFiveLevelUpperBookAndOneLevelLowerConstructorParameters
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
    data: T_BookNodeCoverFiveLevelUpperBookAndOneLevelLowerConstructorParametersJSON
  ): BookNodeCoverFiveLevelUpperBookAndOneLevelLower {
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);
    const parent = BookNodeCoverFourLevelUpperBook.createFromJSON(data.parent);
    const nodes = data.nodes.map(BookNodeCover.createFromJSON);
    return new BookNodeCoverFiveLevelUpperBookAndOneLevelLower({
      ...data,
      meanings,
      parent,
      nodes,
    });
  }
}
