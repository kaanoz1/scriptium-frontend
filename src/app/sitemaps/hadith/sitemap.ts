import { MetadataRoute } from "next";
import { SITE_URL } from "@/configuration";
import { BackendApi } from "@/tool/Fetchers/BackendApi";

/**
 * Sitemaps of the Arabic hadith corpus (narrators and critics are in
 * /sitemaps/jarh-tadil), split to stay under the 50,000-URL
 * limit: /sitemaps/hadith/sitemap/<id>.xml, listed in robots.txt.
 *   index    corpus pages, books, subjects
 *   h-<n>    hadith pages
 *   g-<n>    meaning-group pages
 */
export const revalidate = 86400;

const LOCALE = "en"; // only English is live
const FALLBACK = { hadiths: 715_790, meaningGroups: 20_283, pageSize: 45_000 };

type Entry = MetadataRoute.Sitemap[number];
const entry = (path: string, priority: number, changeFrequency: Entry["changeFrequency"] = "monthly"): Entry => ({
  url: `${SITE_URL}/${LOCALE}/i/h${path}`,
  changeFrequency,
  priority,
});

export async function hadithSitemapIds(): Promise<{ id: string }[]> {
  let counts = FALLBACK;
  try {
    const res = await BackendApi.HadithArabicOnlyController.sitemapSummary();
    if (res.ok) counts = res.data;
  } catch {
    // Backend unreachable (e.g. at build time): use the known corpus size.
  }
  const pages = (n: number) => Math.max(1, Math.ceil(n / counts.pageSize));
  return [
    { id: "index" },
    ...Array.from({ length: pages(counts.hadiths) }, (_, i) => ({ id: `h-${i}` })),
    ...Array.from({ length: pages(counts.meaningGroups) }, (_, i) => ({ id: `g-${i}` })),
  ];
}

export async function generateSitemaps() {
  return hadithSitemapIds();
}

export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  const api = BackendApi.HadithArabicOnlyController;

  try {
    if (id === "index") {
      const out: Entry[] = [
        entry("", 0.8),
        entry("/ao", 0.9, "weekly"),
        entry("/ao/topic", 0.6),
      ];
      const [books, topics] = await Promise.all([api.books(), api.topics()]);
      if (books.ok) for (const c of books.data.categories) for (const b of c.books) out.push(entry(`/ao/${b.id}`, 0.7));
      if (topics.ok) for (const t of topics.data.children) out.push(entry(`/ao/topic/${t.id}`, 0.4));
      return out;
    }

    const [kind, rawPage] = id.split("-");
    const page = Number.parseInt(rawPage, 10);
    if (!Number.isInteger(page) || page < 0) return [];

    if (kind === "h") {
      const res = await api.sitemapHadiths(page);
      return res.ok ? res.data.hadiths.map(([b, n]) => entry(`/ao/${b}/${n}`, 0.6)) : [];
    }
    if (kind === "g") {
      const res = await api.sitemapGroups(page);
      return res.ok ? res.data.ids.map((g) => entry(`/ao/group/${g}`, 0.5)) : [];
    }
  } catch (error) {
    console.warn(`[sitemap] hadith sitemap ${id} unavailable; it will be rebuilt on the next revalidation.`, error);
  }
  return [];
}
