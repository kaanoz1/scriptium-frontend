import { TraditionCacheKeyBuilder } from "../../../TraditionCacheKeyBuilder";
import { SectionBookNodeCacheKeyBuilder } from "../SectionBookNodeCacheKeyBuilder/SectionBookNodeCacheKeyBuilder";

export class DivisionBookNodeCacheKeyBuilder extends TraditionCacheKeyBuilder {
  protected override prefix: string = "division";

  setDivisionMeaning(divisionMeaning: string) {
    this.state.concatenate(divisionMeaning);
    return new SectionBookNodeCacheKeyBuilder(this.state);
  }
}
