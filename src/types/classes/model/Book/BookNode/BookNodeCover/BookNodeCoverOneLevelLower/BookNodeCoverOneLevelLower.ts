import {
  T_BookNodeCoverConstructorParameters,
  BookNodeCover,
  T_BookNodeCoverConstructorParametersJSON,
} from "../ BookNodeCover";
import { BookNodeMeaning } from "../../../BookNodeMeaning/BookNodeMeaning";

export type T_BookNodeCoverOneLevelLowerConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    nodes: Array<BookNodeCover>;
  };

export type T_BookNodeCoverOneLevelLowerConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    nodes: Array<T_BookNodeCoverConstructorParametersJSON>;
  };

export class BookNodeCoverOneLevelLower extends BookNodeCover {
  private readonly _nodes: ReadonlyArray<BookNodeCover>;

  constructor(data: T_BookNodeCoverOneLevelLowerConstructorParameters) {
    super({ ...data });
    this._nodes = data.nodes;
  }

  getNodes(): ReadonlyArray<BookNodeCover> {
    return this._nodes;
  }

  static override createFromJSON(
    data: T_BookNodeCoverOneLevelLowerConstructorParametersJSON
  ): BookNodeCoverOneLevelLower {
    const nodes = data.nodes.map(BookNodeCover.createFromJSON);
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);
    return new BookNodeCoverOneLevelLower({ ...data, nodes, meanings });
  }
}
