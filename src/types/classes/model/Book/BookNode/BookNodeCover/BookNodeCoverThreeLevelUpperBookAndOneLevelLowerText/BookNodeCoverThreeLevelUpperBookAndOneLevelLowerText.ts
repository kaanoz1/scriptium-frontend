import {
  T_BookNodeCoverConstructorParameters,
  T_BookNodeCoverConstructorParametersJSON,
  BookNodeCover,
} from "../ BookNodeCover";
import { BookNodeMeaning } from "../../../BookNodeMeaning/BookNodeMeaning";
import {
  BookText,
  T_BookTextConstructorParametersJSON,
} from "../../../BookText/BookText/BookText";
import {
  BookNodeCoverTwoLevelUpperBook,
  T_BookNodeCoverTwoLevelUpperBookConstructorParametersJSON,
} from "../BookNodeCoverTwoLevelUpper/BookNodeCoverTwoLevelUpperBook/BookNodeCoverTwoLevelUpperBook";

export type T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerTextConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCoverTwoLevelUpperBook;
    texts: Array<BookText>;
  };

export type T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverTwoLevelUpperBookConstructorParametersJSON;
    texts: Array<T_BookTextConstructorParametersJSON>;
  };

export class BookNodeCoverThreeLevelUpperBookAndOneLevelLowerText extends BookNodeCover {
  private readonly _parent: Readonly<BookNodeCoverTwoLevelUpperBook>;
  private readonly _texts: ReadonlyArray<BookText>;

  constructor(
    data: T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerTextConstructorParameters
  ) {
    super({ ...data });
    this._parent = data.parent;
    this._texts = data.texts;
  }

  getParent() {
    return this._parent;
  }

  getTexts() {
    return this._texts;
  }

  static override createFromJSON(
    data: T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON
  ): BookNodeCoverThreeLevelUpperBookAndOneLevelLowerText {
    const parent = BookNodeCoverTwoLevelUpperBook.createFromJSON(data.parent);
    const texts = data.texts.map(BookText.createFromJSON);
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);
    return new BookNodeCoverThreeLevelUpperBookAndOneLevelLowerText({
      ...data,
      parent,
      texts,
      meanings,
    });
  }
}
