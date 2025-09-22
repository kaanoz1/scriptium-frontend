import { ChapterMetadataBuilder } from "../ChapterMetadataValueBuilder/ChapterMetadataValueBuilder";
import { Metadata } from "next";
import { VerseUpper } from "@/types/classes/model/Verse/Verse/VerseUpper/VerseUpper";

export class VerseMetadataBuilder extends ChapterMetadataBuilder {
  private readonly verse: Readonly<VerseUpper>;

  constructor(verse: Readonly<VerseUpper>) {
    super(verse.getChapter());
    this.verse = verse;
  }

  override build(): Metadata {
    const base = super.build();

    const number = this.verse.getNumber();

    return {
      title: `${base.title}:${number}`,
      description: `${base.description} - Verse: ${number}`,
      keywords: [...(base.keywords ?? []), "verse", number.toString()],
    };
  }
}
