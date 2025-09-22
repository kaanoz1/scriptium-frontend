import { Metadata } from "next";
import { ScriptureMetadataBuilder } from "../ScriptureMetadataValueBuilder/ScriptureMetadataBuilder";
import { SectionUpper } from "@/types/classes/model/Section/Section/SectionUpper/SectionUpper";

export class SectionMetadataBuilder extends ScriptureMetadataBuilder {
  protected readonly section: Readonly<SectionUpper>;

  constructor(section: Readonly<SectionUpper>) {
    super(section.getScripture());
    this.section = section;
  }

  override build(): Metadata {
    const base = super.build();

    const name = this.section.getName();
    const meaning = this.section.getMeaningTextOrDefault("en");

    return {
      title: `${base.title} - ${meaning}`,
      description: `${base.description} - Section: ${meaning} (${name})`,
      keywords: [...(base.keywords ?? []), "section", meaning, name],
    };
  }
}
