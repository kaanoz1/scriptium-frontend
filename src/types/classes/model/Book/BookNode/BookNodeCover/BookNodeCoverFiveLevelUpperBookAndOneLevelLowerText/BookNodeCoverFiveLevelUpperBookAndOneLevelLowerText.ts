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
  BookNodeCoverFourLevelUpperBook,
  T_BookNodeCoverFourLevelUpperBookConstructorParametersJSON,
} from "../BookNodeCoverFourLevelUpperBook/BookNodeCoverFourLevelUpperBook";

export type T_BookNodeCoverFiveLevelUpperBookAndOneLevelLowerTextConstructorParameters =
  T_BookNodeCoverConstructorParameters & {
    parent: BookNodeCoverFourLevelUpperBook;
    texts: Array<BookText>;
  };

export type T_BookNodeCoverFiveLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON =
  T_BookNodeCoverConstructorParametersJSON & {
    parent: T_BookNodeCoverFourLevelUpperBookConstructorParametersJSON;
    texts: Array<T_BookTextConstructorParametersJSON>;
  };

export class BookNodeCoverFiveLevelUpperBookAndOneLevelLowerText extends BookNodeCover {
  private readonly _parent: Readonly<BookNodeCoverFourLevelUpperBook>;
  private readonly _texts: ReadonlyArray<BookText>;

  constructor(
    data: T_BookNodeCoverFiveLevelUpperBookAndOneLevelLowerTextConstructorParameters
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
    data: T_BookNodeCoverFiveLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON
  ): BookNodeCoverFiveLevelUpperBookAndOneLevelLowerText {
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);
    const texts = data.texts.map(BookText.createFromJSON);
    const parent = BookNodeCoverFourLevelUpperBook.createFromJSON(data.parent);
    return new BookNodeCoverFiveLevelUpperBookAndOneLevelLowerText({
      ...data,
      meanings,
      texts,
      parent,
    });
  }
}
