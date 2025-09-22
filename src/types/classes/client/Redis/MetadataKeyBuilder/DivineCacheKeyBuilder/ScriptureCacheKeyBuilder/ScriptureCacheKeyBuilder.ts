import { T_ScriptureCode } from "@/types/types";
import { SectionCacheKeyBuilder } from "../SectionCacheKeyBuilder/SectionCacheKeyBuilder";
import { DivineCacheKeyBuilder } from "../DivineCacheKeyBuilder";

export class ScriptureCacheKeyBuilder extends DivineCacheKeyBuilder {
  protected override prefix = "scripture";

  constructor() {
    super();
  }

  public setScriptureCode(scriptureCode: T_ScriptureCode) {
    this.state.concatenate(scriptureCode.toString());
    return new SectionCacheKeyBuilder(this.state);
  }
}
