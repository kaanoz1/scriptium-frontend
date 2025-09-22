export class RedisKeyState {
  public key: string = "";
  public readonly SEPARATOR = "|";

  concatenate(part: string) {
    if (this.key === "") {
      this.key = part;
    } else {
      this.key += this.SEPARATOR + part;
    }
  }

  getFullKey(prefix: string) {
    if (!this.key) {
      throw new Error("Cannot build Redis cache key from empty segments.");
    }

    return `${prefix}-${this.key}`;
  }
}
