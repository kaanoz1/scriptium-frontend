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
  BookNodeCoverOneLevelUpperBook,
  T_BookNodeCoverOneLevelUpperBookConstructorParametersJSON,
} from "../BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBook/BookNodeCoverOneLevelUpperBook";

export type T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerTextConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCoverOneLevelUpperBook;
    texts: Array<BookText>;
  };

export type T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverOneLevelUpperBookConstructorParametersJSON;
    texts: Array<T_BookTextConstructorParametersJSON>;
  };

export class BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText extends BookNodeCover {
  private readonly _parent: Readonly<BookNodeCoverOneLevelUpperBook>;
  private readonly _texts: ReadonlyArray<BookText>;

  constructor(
    data: T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerTextConstructorParameters
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
    data: T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON
  ): BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText {
    const parent = BookNodeCoverOneLevelUpperBook.createFromJSON(data.parent);
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);
    const texts = data.texts.map(BookText.createFromJSON);
    return new BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText({
      ...data,
      parent,
      meanings,
      texts,
    });
  }
}
