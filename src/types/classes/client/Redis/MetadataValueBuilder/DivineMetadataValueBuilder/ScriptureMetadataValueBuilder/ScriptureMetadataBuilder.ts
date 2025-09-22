import { Scripture } from "@/types/classes/model/Scripture/Scripture/Scripture";
import { Metadata } from "next";
import { DivineMetadataValueBuilder } from "../DivineValueBuilder";

export class ScriptureMetadataBuilder extends DivineMetadataValueBuilder {
  protected readonly scripture: Readonly<Scripture>;

  constructor(scripture: Readonly<Scripture>) {
    super();
    this.scripture = scripture;
  }

  override build(): Metadata {
    const name = this.scripture.getName();
    const meaning = this.scripture.getMeaningTextOrDefault("en");

    return {
      title: `${meaning}`,
      description: `${meaning} (${name})`,
      keywords: [
        "scripture",
        meaning,
        meaning.toLowerCase(),
        meaning.toUpperCase(),
        name,
      ],
    };
  }
}
