import { T_ScriptureCode } from "@/types/types";
import { DivineCacheKeyBuilder } from "../DivineCacheKeyBuilder";

export class RootCacheKeyBuilder extends DivineCacheKeyBuilder {
  protected override prefix: string = "root";

  constructor() {
    super();
  }

  setScriptureCodeAndRootLatin(
    scriptureCode: T_ScriptureCode,
    rootLatin: string
  ) {
    this.state.concatenate(scriptureCode);
    this.state.concatenate(rootLatin);
    return this;
  }
}
