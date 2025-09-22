import { TraditionCacheKeyBuilder } from "../../../TraditionCacheKeyBuilder";
import { DivisionBookNodeCacheKeyBuilder } from "../DivisionBookNodeCacheKeyBuilder/DivisionBookNodeCacheKeyBuilder";

export class SubPartBookNodeCacheKeyBuilder extends TraditionCacheKeyBuilder {
  protected override prefix: string = "book-subPart";

  setSubPartMeaning(subPartMeaning: string) {
    this.state.concatenate(subPartMeaning);
    return new DivisionBookNodeCacheKeyBuilder(this.state);
  }
}
