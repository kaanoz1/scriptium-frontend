import { TraditionCacheKeyBuilder } from "../../TraditionCacheKeyBuilder";
import { PartBookNodeCacheKeyBuilder } from "../BookNodeCacheKeyBuilder/PartBookNodeCacheKeyBuilder/PartBookNodeCacheKeyBuilder";

export class BookCacheKeyBuilder extends TraditionCacheKeyBuilder {
  protected override prefix: string = "book";

  setBookMeaning(bookMeaning: string) {
    this.state.concatenate(bookMeaning);
    return new PartBookNodeCacheKeyBuilder(this.state);
  }
}
