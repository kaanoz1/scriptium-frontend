import { TraditionCacheKeyBuilder } from "../../../TraditionCacheKeyBuilder";
import { DivisionBookNodeCacheKeyBuilder } from "../DivisionBookNodeCacheKeyBuilder/DivisionBookNodeCacheKeyBuilder";

export class SubChapterBookNodeCacheKeyBuilder extends TraditionCacheKeyBuilder {
  protected override prefix: string = "book-subChapter";

  setSubPartName(subPartName: string) {
    this.state.concatenate(subPartName);
    return new DivisionBookNodeCacheKeyBuilder(this.state);
  }
}
