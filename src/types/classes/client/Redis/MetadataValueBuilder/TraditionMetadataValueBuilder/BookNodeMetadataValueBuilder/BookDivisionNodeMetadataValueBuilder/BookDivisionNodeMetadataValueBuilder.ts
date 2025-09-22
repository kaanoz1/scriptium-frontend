import { Metadata } from "next";
import { BookSubPartNodeMetadataValueBuilder } from "../BookSubPartNodeMetadataValueBuilder/BookSubPartNodeMetadataValueBuilder";
import { BookNodeCoverThreeLevelUpperBook } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverThreeLevelUpperBook/BookNodeCoverThreeLevelUpperBook";
import { DEFAULT_LANG_CODE, PROJECT_NAME } from "@/util/constants";

export class BookDivisionNodeMetadataValueBuilder extends BookSubPartNodeMetadataValueBuilder {
  private readonly divisionNode: Readonly<BookNodeCoverThreeLevelUpperBook>;

  constructor(divisionNode: Readonly<BookNodeCoverThreeLevelUpperBook>) {
    super(divisionNode.getParent());
    this.divisionNode = divisionNode;
  }

  override build(): Metadata {
    const base = super.build();

    const name = this.divisionNode.getName();
    const meaning =
      this.divisionNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
    const description = this.divisionNode.getDescription() ?? "";
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
