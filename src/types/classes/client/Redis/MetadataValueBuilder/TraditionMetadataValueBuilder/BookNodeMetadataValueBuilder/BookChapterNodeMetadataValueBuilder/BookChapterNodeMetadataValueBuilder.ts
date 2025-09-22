import { BookSectionNodeMetadataValueBuilder } from "../BookSectionNodeMetadataValueBuilder/BookSectionNodeMetadataValueBuilder";
import { DEFAULT_LANG_CODE, PROJECT_NAME } from "@/util/constants";
import { Metadata } from "next";
import { BookNodeCoverFiveLevelUpperBook } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFiveLevelUpperBook/BookNodeCoverFiveLevelUpperBook";

export class BookChapterNodeMetadataValueBuilder extends BookSectionNodeMetadataValueBuilder {
  private readonly chapterNode: Readonly<BookNodeCoverFiveLevelUpperBook>;

  constructor(chapterNode: Readonly<BookNodeCoverFiveLevelUpperBook>) {
    super(chapterNode.getParent());
    this.chapterNode = chapterNode;
  }

  override build(): Metadata {
    const base = super.build();

    const name = this.chapterNode.getName();
    const meaning = this.chapterNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
    const description = this.chapterNode.getDescription() ?? "";
    return {
      title: `${base.title} ${meaning ?? name}`,
      description: `${meaning} (${name})`,
      keywords: [
        ...(base.keywords ?? []),
        "book",
        PROJECT_NAME,
        PROJECT_NAME.toUpperCase(),
        PROJECT_NAME.toLowerCase(),
        meaning,
        meaning.toLowerCase(),
        meaning.toUpperCase(),
        name,
        description,
      ],
    };
  }
}
