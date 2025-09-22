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
  BookNodeCoverThreeLevelUpperBook,
  T_BookNodeCoverThreeLevelUpperBookConstructorParametersJSON,
} from "../BookNodeCoverThreeLevelUpperBook/BookNodeCoverThreeLevelUpperBook";

export type T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerTextConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCoverThreeLevelUpperBook;
    texts: Array<BookText>;
  };

export type T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverThreeLevelUpperBookConstructorParametersJSON;
    texts: Array<T_BookTextConstructorParametersJSON>;
  };

export class BookNodeCoverFourLevelUpperBookAndOneLevelLowerText extends BookNodeCover {
  private readonly _parent: Readonly<BookNodeCoverThreeLevelUpperBook>;
  private readonly _texts: ReadonlyArray<BookText>;

  constructor(
    data: T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerTextConstructorParameters
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
    data: T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON
  ): BookNodeCoverFourLevelUpperBookAndOneLevelLowerText {
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);
    const texts = data.texts.map(BookText.createFromJSON);
    const parent = BookNodeCoverThreeLevelUpperBook.createFromJSON(data.parent);
    return new BookNodeCoverFourLevelUpperBookAndOneLevelLowerText({
      ...data,
      meanings,
      texts,
      parent,
    });
  }
}
