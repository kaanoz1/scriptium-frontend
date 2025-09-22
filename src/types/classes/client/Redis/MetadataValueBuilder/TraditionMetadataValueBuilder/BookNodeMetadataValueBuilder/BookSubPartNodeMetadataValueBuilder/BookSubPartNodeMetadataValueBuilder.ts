import { BookNodeCoverTwoLevelUpperBook } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverTwoLevelUpper/BookNodeCoverTwoLevelUpperBook/BookNodeCoverTwoLevelUpperBook";
import { BookPartNodeMetadataValueBuilder } from "../BookPartNodeMetadataValueBuilder/BookPartNodeMetadataValueBuilder";
import { DEFAULT_LANG_CODE, PROJECT_NAME } from "@/util/constants";
import { Metadata } from "next";

export class BookSubPartNodeMetadataValueBuilder extends BookPartNodeMetadataValueBuilder {
  private readonly subPartNode: Readonly<BookNodeCoverTwoLevelUpperBook>;

  constructor(node: Readonly<BookNodeCoverTwoLevelUpperBook>) {
    super(node.getParent());
    this.subPartNode = node;
  }

  override build(): Metadata {
    const base = super.build();

    const name = this.subPartNode.getName();
    const meaning = this.subPartNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
    const description = this.subPartNode.getDescription() ?? "";
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
