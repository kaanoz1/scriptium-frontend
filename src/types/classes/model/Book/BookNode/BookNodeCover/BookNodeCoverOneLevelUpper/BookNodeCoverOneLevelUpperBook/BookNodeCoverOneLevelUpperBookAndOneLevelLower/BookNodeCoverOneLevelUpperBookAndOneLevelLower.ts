import {
  BookCover,
  T_BookCoverConstructorParametersJSON,
} from "@/types/classes/model/Book/Book/BookCover/BookCover";
import { BookNodeMeaning } from "@/types/classes/model/Book/BookNodeMeaning/BookNodeMeaning";
import {
  T_BookNodeCoverConstructorParameters,
  BookNodeCover,
  T_BookNodeCoverConstructorParametersJSON,
} from "../../../ BookNodeCover";

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
  private readonly _book: BookCover;
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

  getNodes(): ReadonlyArray<BookNodeCover> {
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
      book,
      nodes,
      meanings,
    });
  }
}
