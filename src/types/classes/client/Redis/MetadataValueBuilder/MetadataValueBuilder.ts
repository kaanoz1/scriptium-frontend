import { Metadata } from "next";

export abstract class MetadataValueBuilder {
  abstract build(): Metadata;
}
