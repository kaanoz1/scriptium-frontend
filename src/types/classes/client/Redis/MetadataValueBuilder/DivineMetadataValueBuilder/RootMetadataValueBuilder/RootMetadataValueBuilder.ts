import { Metadata } from "next";
import { DivineMetadataValueBuilder } from "../DivineValueBuilder";
import { Root } from "@/types/classes/model/Root/Root/Root";
import { PROJECT_NAME } from "@/util/constants";

export class RootMetadataValueBuilder extends DivineMetadataValueBuilder {
  protected readonly root: Readonly<Root>;

  constructor(root: Readonly<Root>) {
    super();
    this.root = root;
  }

  override build(): Metadata {
    const rootOwn = this.root.getOwn();

    const rootLatin = this.root.getLatin();

    return {
      title: `${PROJECT_NAME} ${rootOwn} - ${rootLatin}`,
      description: `Root: ${rootOwn} (${rootLatin})`,
      keywords: [
        PROJECT_NAME,
        PROJECT_NAME.toLowerCase(),
        PROJECT_NAME.toUpperCase(),
        rootLatin,
        rootLatin.toLowerCase(),
        rootLatin.toUpperCase(),
        rootOwn,
        rootOwn.toLowerCase(),
        rootOwn.toUpperCase(),
      ],
    };
  }
}
