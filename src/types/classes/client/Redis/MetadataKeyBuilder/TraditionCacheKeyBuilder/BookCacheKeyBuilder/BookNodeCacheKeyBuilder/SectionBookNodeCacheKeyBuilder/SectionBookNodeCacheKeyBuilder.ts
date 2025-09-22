import { TraditionCacheKeyBuilder } from "../../../TraditionCacheKeyBuilder";
import { ChapterBookNodeCacheKeyBuilder } from "../ChapterBookNodeCacheKeyBuilder/ChapterBookNodeCacheKeyBuilder";

export class SectionBookNodeCacheKeyBuilder extends TraditionCacheKeyBuilder {
  protected override prefix: string = "book-section";

  setSectionMeaning(sectionMeaning: string) {
    this.state.concatenate(sectionMeaning);
    return new ChapterBookNodeCacheKeyBuilder(this.state);
  }
}
