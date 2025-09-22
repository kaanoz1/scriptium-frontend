import { T_SystemLanguageCode } from "@/types/types";
import {
  BookNodeMeaning,
  T_BookNodeMeaningConstructorParametersJSON,
} from "../../BookNodeMeaning/BookNodeMeaning";

export type T_BookNodeCoverConstructorParameters = {
  id: number;
  name: string;
  meanings: Array<BookNodeMeaning>;
  description: string | null;
};

export type T_BookNodeCoverConstructorParametersJSON = {
  id: number;
  name: string;
  meanings: Array<T_BookNodeMeaningConstructorParametersJSON>;
  description: string | null;
};

export class BookNodeCover {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _meanings: ReadonlyArray<BookNodeMeaning>;
  private readonly _description: string | null;

  constructor(data: T_BookNodeCoverConstructorParameters) {
    const { id, name, meanings, description } = data;

    this._id = id;
    this._name = name;
    this._meanings = meanings;
    this._description = description;
  }
  getId(): number {
    return this._id;
  }

  getName(): string {
    return this._name;
  }

  getMeanings() {
    return this._meanings;
  }

  getDescription() {
    return this._description;
  }

  getMeaningTextOrDefault(langCode: T_SystemLanguageCode) {
    return (
      this.getMeanings()
        .find((t) => t.getLanguage().getLangCode() == langCode)
        ?.getText() ?? "Node"
    );
  }

  static createFromJSON(data: T_BookNodeCoverConstructorParametersJSON) {
    const meanings = data.meanings.map(BookNodeMeaning.createFromJSON);
    return new BookNodeCover({ ...data, meanings });
  }
}
