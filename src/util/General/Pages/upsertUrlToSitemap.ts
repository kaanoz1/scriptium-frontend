import db from "@/lib/prisma";

const ONE_HOUR_MS = 60 * 60 * 1000;

const memoryCache = new Map<string, number>();

const upsertUrlToSitemap = async (url: string) => {
  const cachedAt = memoryCache.get(url);
  const now = Date.now();

  if (cachedAt && now - cachedAt < ONE_HOUR_MS) return;

  const existing = await db.sitemaps.findUnique({
    where: { url },
    select: { lastMod: true },
  });

  if (!existing) {
    await db.sitemaps.create({
      data: { url, lastMod: new Date() },
    });
    memoryCache.set(url, now);
    return;
  }

  const isStale = now - existing.lastMod.getTime() > ONE_HOUR_MS;

  if (!isStale) {
    memoryCache.set(url, now);
    return;
  }

  await db.sitemaps.update({
    where: { url },
    data: { lastMod: new Date() },
  });
  memoryCache.set(url, now);
};

export default upsertUrlToSitemap;
