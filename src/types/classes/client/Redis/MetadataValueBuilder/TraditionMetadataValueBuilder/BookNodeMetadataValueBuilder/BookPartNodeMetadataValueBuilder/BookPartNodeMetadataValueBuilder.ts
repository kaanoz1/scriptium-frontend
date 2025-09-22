import { Metadata } from "next";
import { BookMetadataValueBuilder } from "../../BookMetadataValueBuilder/BookMetadataValueBuilder";
import { BookNodeCoverOneLevelUpperBook } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBook/BookNodeCoverOneLevelUpperBook";
import { DEFAULT_LANG_CODE, PROJECT_NAME } from "@/util/constants";

export class BookPartNodeMetadataValueBuilder extends BookMetadataValueBuilder {
  private readonly node: Readonly<BookNodeCoverOneLevelUpperBook>;

  constructor(node: Readonly<BookNodeCoverOneLevelUpperBook>) {
    super(node.getBook());
    this.node = node;
  }

  override build(): Metadata {
    const base = super.build();

    const name = this.node.getName();
    const meaning = this.node.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
    const description = this.node.getDescription() ?? "";
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
