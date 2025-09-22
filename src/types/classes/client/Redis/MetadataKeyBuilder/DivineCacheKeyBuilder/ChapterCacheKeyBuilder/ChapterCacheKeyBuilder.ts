import { RedisKeyState } from "../../RedisKeyState/RedisKeyState";
import { DivineCacheKeyBuilder } from "../DivineCacheKeyBuilder";
import { VerseCacheKeyBuilder } from "../VerseCacheKeyBuilder/VerseCacheKeyBuilder";

export class ChapterCacheKeyBuilder extends DivineCacheKeyBuilder {
  override prefix = "chapter";

  constructor(state: RedisKeyState) {
    super(state);
  }

  public setChapterNumber(chapter: number) {
    this.state.concatenate(chapter.toString());
    return new VerseCacheKeyBuilder(this.state);
  }
}
