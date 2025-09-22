import { RedisKeyState } from "../../RedisKeyState/RedisKeyState";
import { ChapterCacheKeyBuilder } from "../ChapterCacheKeyBuilder/ChapterCacheKeyBuilder";
import { DivineCacheKeyBuilder } from "../DivineCacheKeyBuilder";

export class SectionCacheKeyBuilder extends DivineCacheKeyBuilder {
  override prefix = "section";

  constructor(state: RedisKeyState) {
    super(state);
  }

  public setSectionNumber(section: number) {
    this.state.concatenate(section.toString());
    return new ChapterCacheKeyBuilder(this.state);
  }
}
