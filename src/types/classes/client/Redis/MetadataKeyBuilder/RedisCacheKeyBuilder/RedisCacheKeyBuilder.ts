import { RedisKeyState } from "../RedisKeyState/RedisKeyState";

export abstract class RedisCacheKeyBuilder {
  protected readonly state: RedisKeyState;
  protected abstract prefix: string;

  constructor(state?: RedisKeyState) {
    this.state = state ?? new RedisKeyState();
  }

  build(): string {
    return this.state.getFullKey(this.prefix);
  }
}
