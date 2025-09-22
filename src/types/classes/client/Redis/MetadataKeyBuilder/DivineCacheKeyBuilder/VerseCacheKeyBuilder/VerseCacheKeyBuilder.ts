import { RedisKeyState } from "../../RedisKeyState/RedisKeyState";
import { DivineCacheKeyBuilder } from "../DivineCacheKeyBuilder";

export class VerseCacheKeyBuilder extends DivineCacheKeyBuilder {
  override prefix = "verse";

  constructor(state: RedisKeyState) {
    super(state);
  }

  public setVerseNumber(verse: number) {
    this.state.concatenate(verse.toString());
    return this;
  }
}
