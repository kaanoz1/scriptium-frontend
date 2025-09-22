import { T_SystemLanguageCode } from "@/types/types";
import {
  BookMeaning,
  T_BookMeaningConstructorParametersJSON,
} from "../BookMeaning/BookMeaning";

export type T_BookCoverConstructorParameters = {
  id: number;
  name: string;
  meanings: Array<BookMeaning>;
  description: string | null;
};

export type T_BookCoverConstructorParametersJSON = {
  id: number;
  name: string;
  meanings: Array<T_BookMeaningConstructorParametersJSON>;
  description: string | null;
};

export class BookCover {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _meanings: ReadonlyArray<BookMeaning>;
  private readonly _description: string | null;
  constructor(data: T_BookCoverConstructorParameters) {
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

  getMeanings(): ReadonlyArray<BookMeaning> {
    return this._meanings;
  }

  getDescription() {
    return this._description;
  }
  getMeaningTextOrDefault(langCode: T_SystemLanguageCode) {
    return (
      this.getMeanings()
        .find((t) => t.getLanguage().getLangCode() == langCode)
        ?.getText() ?? "Book"
    );
  }

  static createFromJSON(data: T_BookCoverConstructorParametersJSON) {
    const meanings = data.meanings.map(BookMeaning.createFromJSON);
    return new BookCover({ ...data, meanings });
  }
}
