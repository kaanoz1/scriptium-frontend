import { ChapterUpper } from "@/types/classes/model/Chapter/Chapter/ChapterUpper/ChapterUpper";
import { Metadata } from "next";
import { SectionMetadataBuilder } from "../SectionMetadataValueBuilder/SectionMetadataValueBuilder";

export class ChapterMetadataBuilder extends SectionMetadataBuilder {
  protected readonly chapter: Readonly<ChapterUpper>;

  constructor(chapter: Readonly<ChapterUpper>) {
    super(chapter.getSection());
    this.chapter = chapter;
  }

  override build(): Metadata {
    const base = super.build();

    const name = this.chapter.getName();
    const number = this.chapter.getNumber();

    return {
      title: `${base.title} ${number}`,
      description: `${base.description} - Chapter: ${number} (${name})`,
      keywords: [...(base.keywords ?? []), "chapter", number.toString(), name],
    };
  }
}
