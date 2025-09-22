import { TraditionCacheKeyBuilder } from "../../../TraditionCacheKeyBuilder";
import { SubPartBookNodeCacheKeyBuilder } from "../SubPartBookNodeCacheKeyBuilder/SubPartBookNodeCacheKeyBuilder";

export class ChapterBookNodeCacheKeyBuilder extends TraditionCacheKeyBuilder {
  protected override prefix: string = "book-chapter";

  setChapterMeaning(chapterMeaning: string) {
    this.state.concatenate(chapterMeaning);
    return new SubPartBookNodeCacheKeyBuilder(this.state);
  }
}
