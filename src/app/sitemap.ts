import { MetadataRoute } from "next";
import { SITE_URL } from "@/configuration";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import { ResponseCodes } from "@/util/types/ResponseCodes";
import { VerseCountIndicator } from "@/util/Islam/Quran/Chapter/VerseCountIndicator";

export const revalidate = 86400; // regenerate daily (roots come from the API)

const LOCALES = ["en"] as const; // only English is live

type Entry = MetadataRoute.Sitemap[number];

const entry = (
  path: string,
  priority: number,
  changeFrequency: Entry["changeFrequency"],
): Entry => ({
  url: `${SITE_URL}${path}`,
  changeFrequency,
  priority,
});

const fetchRootLatins = async (): Promise<string[]> => {
  try {
    const response = await BackendApi.RootController.list();
    if (response.status !== ResponseCodes.OK || !response.data) return [];
    return response.data.map((r) => r.latin);
  } catch (error) {
    console.warn(
      "[sitemap] Could not load roots; they will be added on the next revalidation.",
      error,
    );
    return [];
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const roots = await fetchRootLatins();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    const base = `/${locale}`;

    // Static pages. Under-construction and "coming soon" pages (/c, /j, /statistics, /developers, /discord) are noindex and left out on purpose.
    entries.push(
      entry(base, 1.0, "weekly"),
      entry(`${base}/i`, 0.9, "monthly"),
      entry(`${base}/i/q`, 0.9, "monthly"),
      entry(`${base}/i/q/root`, 0.7, "monthly"),
      entry(`${base}/about`, 0.4, "yearly"),
      // Hadith pages are listed in their own sitemaps (/sitemaps/hadith/...).
      entry(`${base}/i/h`, 0.8, "monthly"),
    );

    // Chapters and verses. For Islam, Quran.
    VerseCountIndicator.forEach((verseCount, i) => {
      const chapter = i + 1;
      entries.push(entry(`${base}/i/q/${chapter}`, 0.8, "monthly"));
      for (let verse = 1; verse <= verseCount; verse++)
        entries.push(entry(`${base}/i/q/${chapter}/${verse}`, 0.6, "monthly"));
    });

    for (const latin of roots)
      entries.push(
        entry(`${base}/i/q/root/${encodeURIComponent(latin)}`, 0.5, "monthly"),
      );
  }
  return entries;
}
