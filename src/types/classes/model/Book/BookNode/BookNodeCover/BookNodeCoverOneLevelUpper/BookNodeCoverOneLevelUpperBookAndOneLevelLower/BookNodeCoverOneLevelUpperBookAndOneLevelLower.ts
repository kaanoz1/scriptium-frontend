import {
  T_BookNodeCoverConstructorParameters,
  BookNodeCover,
  T_BookNodeCoverConstructorParametersJSON,
} from "../../ BookNodeCover";
import {
  BookCover,
  T_BookCoverConstructorParametersJSON,
} from "../../../../Book/BookCover/BookCover";
import { BookNodeMeaning } from "../../../../BookNodeMeaning/BookNodeMeaning";

export type T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    book: BookCover;
    nodes: Array<BookNodeCover>;
  };

export type T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    book: T_BookCoverConstructorParametersJSON;
    nodes: Array<T_BookNodeCoverConstructorParametersJSON>;
  };

export class BookNodeCoverOneLevelUpperBookAndOneLevelLower extends BookNodeCover {
  private readonly _book: Readonly<BookCover>;
  private readonly _nodes: ReadonlyArray<BookNodeCover>;
  constructor(
    data: T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerConstructorParameters
  ) {
    super({ ...data });
    this._book = data.book;
    this._nodes = data.nodes;
  }

  getBook() {
    return this._book;
  }

  getNodes() {
    return this._nodes;
  }

  static override createFromJSON(
    data: T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerConstructorParametersJSON
  ): BookNodeCoverOneLevelUpperBookAndOneLevelLower {
    const book = BookCover.createFromJSON(data.book);
    const nodes = data.nodes.map(BookNodeCover.createFromJSON);
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);

    return new BookNodeCoverOneLevelUpperBookAndOneLevelLower({
      ...data,
      nodes,
      meanings,
      book,
    });
  }
}
