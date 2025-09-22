import Redis from "ioredis";
import { Metadata } from "next";
import { RedisCacheKeyBuilder } from "./MetadataKeyBuilder/RedisCacheKeyBuilder/RedisCacheKeyBuilder";

export class RedisClient {
  private client: Redis;
  public metadataCache: MetadataCache;

  constructor(redisUrl?: string) {
    const url = redisUrl ?? process.env["REDIS_URL"];

    if (!url)
      throw new Error("REDIS_URL is not defined in environment variables.");

    this.client = new Redis(url);
    this.metadataCache = new MetadataCache(this.client);
  }

  private getMetadataCache() {
    return this.metadataCache;
  }

  getMetadata(builder: RedisCacheKeyBuilder) {
    return this.getMetadataCache().get(builder);
  }
}

class MetadataCache {
  private readonly redis: Readonly<Redis>;
  private readonly prefix: Readonly<string> = "metadata:";
  private readonly TTL = 60 * 60 * 24 * 30;
  constructor(redis: Redis) {
    this.redis = redis;
  }

  private getTTL() {
    return this.TTL;
  }

  private isValidMetadataObject(input: unknown): input is Metadata {
    if (typeof input !== "object" || input === null) return false;

    if (!("title" in input) || typeof input.title !== "string") return false;

    if (!("description" in input) || !("keywords" in input)) return false;

    if (typeof input.description !== "string") return false;
    if (!Array.isArray(input.keywords) || input.keywords.length === 0)
      return false;

    return true;
  }

  async get(builder: RedisCacheKeyBuilder): Promise<Metadata | null> {
    const key = builder.build();
    const cached = await this.redis.get(key);
    if (!cached) return null;
    const data = JSON.parse(cached);
    if (!this.isValidMetadataObject(data)) {
      console.error(`[FATAL]: Invalid metadata in cache for key ${key}`);
      return null;
    }
    return data;
  }

  async set(scriptureCode: string, metadata: Metadata): Promise<void> {
    const key = this.prefix + scriptureCode;

    //For SEO.
    if (!metadata.title) throw new Error("Metadata does not have a title.");

    if (!metadata.description)
      throw new Error("Metadata does not have a description.");

    if (!metadata.keywords || metadata.keywords.length === 0)
      throw new Error(
        "Metadata does not have keyword lists or it does not contain any elements."
      );

    await this.redis.setex(key, this.getTTL(), JSON.stringify(metadata));
  }
}
