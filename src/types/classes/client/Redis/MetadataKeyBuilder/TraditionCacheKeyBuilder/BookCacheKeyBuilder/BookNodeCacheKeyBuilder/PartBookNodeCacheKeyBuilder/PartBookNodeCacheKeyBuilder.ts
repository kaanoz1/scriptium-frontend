import { TraditionCacheKeyBuilder } from "../../../TraditionCacheKeyBuilder";
import { SubPartBookNodeCacheKeyBuilder } from "../SubPartBookNodeCacheKeyBuilder/SubPartBookNodeCacheKeyBuilder";

export class PartBookNodeCacheKeyBuilder extends TraditionCacheKeyBuilder {
  protected override prefix: string = "book-part";

  setPartNodeMeaning(partNodeMeaning: string) {
    this.state.concatenate(partNodeMeaning);
    return new SubPartBookNodeCacheKeyBuilder(this.state);
  }
}
