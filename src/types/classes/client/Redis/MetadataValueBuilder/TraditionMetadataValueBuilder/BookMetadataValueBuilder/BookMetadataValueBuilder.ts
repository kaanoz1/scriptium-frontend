import { Metadata } from "next";
import { TraditionMetadataValueBuilder } from "../TraditionMetadataValueBuilder";
import { BookCover } from "@/types/classes/model/Book/Book/BookCover/BookCover";
import { DEFAULT_LANG_CODE, PROJECT_NAME } from "@/util/constants";

export class BookMetadataValueBuilder extends TraditionMetadataValueBuilder {
  private readonly book: Readonly<BookCover>;

  constructor(book: BookCover) {
    super();
    this.book = book;
  }

  override build(): Metadata {
    const bookMeaning = this.book.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
    const bookName = this.book.getName();

    const description = this.book.getDescription() ?? "Book";

    return {
      title: `${bookMeaning}`,
      description: description,
      keywords: [
        PROJECT_NAME,
        PROJECT_NAME.toUpperCase(),
        PROJECT_NAME.toLowerCase(),
        bookMeaning,
        bookName,
      ],
    };
  }
}
