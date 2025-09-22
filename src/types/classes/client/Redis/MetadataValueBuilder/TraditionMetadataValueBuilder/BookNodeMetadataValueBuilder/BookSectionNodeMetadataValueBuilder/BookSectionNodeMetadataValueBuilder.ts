import { BookNodeCoverFourLevelUpperBook } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFourLevelUpperBook/BookNodeCoverFourLevelUpperBook";
import { BookDivisionNodeMetadataValueBuilder } from "../BookDivisionNodeMetadataValueBuilder/BookDivisionNodeMetadataValueBuilder";
import { DEFAULT_LANG_CODE, PROJECT_NAME } from "@/util/constants";
import { Metadata } from "next";

export class BookSectionNodeMetadataValueBuilder extends BookDivisionNodeMetadataValueBuilder {
  private readonly sectionNode: Readonly<BookNodeCoverFourLevelUpperBook>;

  constructor(sectionNode: Readonly<BookNodeCoverFourLevelUpperBook>) {
    super(sectionNode.getParent());
    this.sectionNode = sectionNode;
  }

  override build(): Metadata {
    const base = super.build();

    const name = this.sectionNode.getName();
    const meaning = this.sectionNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
    const description = this.sectionNode.getDescription() ?? "";
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
