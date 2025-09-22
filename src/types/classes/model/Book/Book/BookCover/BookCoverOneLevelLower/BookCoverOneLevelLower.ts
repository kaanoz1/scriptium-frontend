import {
  BookNodeCover,
  T_BookNodeCoverConstructorParametersJSON,
} from "../../../BookNode/BookNodeCover/ BookNodeCover";
import { BookMeaning } from "../../BookMeaning/BookMeaning";
import {
  T_BookCoverConstructorParameters,
  T_BookCoverConstructorParametersJSON,
  BookCover,
} from "../BookCover";

export type T_BookCoverOneLevelLowerConstructorParameters =
  T_BookCoverConstructorParameters & {
    nodes: Array<BookNodeCover>;
  };

export type T_BookCoverOneLevelLowerConstructorParametersJSON =
  T_BookCoverConstructorParametersJSON & {
    nodes: Array<T_BookNodeCoverConstructorParametersJSON>;
  };

export class BookCoverOneLevelLower extends BookCover {
  private readonly _nodes: ReadonlyArray<BookNodeCover>;
  constructor(data: T_BookCoverOneLevelLowerConstructorParameters) {
    super({ ...data });
    this._nodes = data.nodes;
  }

  getNodes(): ReadonlyArray<BookNodeCover> {
    return this._nodes;
  }

  static override createFromJSON(
    data: T_BookCoverOneLevelLowerConstructorParametersJSON
  ) {
    const meanings = data.meanings.map(BookMeaning.createFromJSON);
    const nodes = data.nodes.map(BookNodeCover.createFromJSON);
    return new BookCoverOneLevelLower({ ...data, meanings, nodes });
  }
}
