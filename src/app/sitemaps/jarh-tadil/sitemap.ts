import { MetadataRoute } from "next";
import { SITE_URL } from "@/configuration";
import { BackendApi } from "@/tool/Fetchers/BackendApi";

/**
 * Sitemaps of the Arabic jarh wa ta'dil corpus, split to stay under the
 * 50,000-URL limit: /sitemaps/jarh-tadil/sitemap/<id>.xml, listed in robots.txt.
 *   index    corpus pages and critics
 *   n-<n>    narrator pages
 */
export const revalidate = 86400;

const LOCALE = "en"; // only English is live
const FALLBACK = { narrators: 49_819, scholars: 1_015, pageSize: 45_000 };

type Entry = MetadataRoute.Sitemap[number];
const entry = (path: string, priority: number, changeFrequency: Entry["changeFrequency"] = "monthly"): Entry => ({
  url: `${SITE_URL}/${LOCALE}/i/jt${path}`,
  changeFrequency,
  priority,
});

export async function jarhTadilSitemapIds(): Promise<{ id: string }[]> {
  let counts = FALLBACK;
  try {
    const res = await BackendApi.JarhTadilArabicOnlyController.sitemapSummary();
    if (res.ok) counts = res.data;
  } catch {
    // Backend unreachable (e.g. at build time): use the known corpus size.
  }
  const pages = Math.max(1, Math.ceil(counts.narrators / counts.pageSize));
  return [{ id: "index" }, ...Array.from({ length: pages }, (_, i) => ({ id: `n-${i}` }))];
}

export async function generateSitemaps() {
  return jarhTadilSitemapIds();
}

export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  const api = BackendApi.JarhTadilArabicOnlyController;

  try {
    if (id === "index") {
      const out: Entry[] = [
        entry("", 0.7),
        entry("/ao", 0.8, "weekly"),
        entry("/ao/narrator", 0.6),
        entry("/ao/scholar", 0.5),
      ];
      const scholars = await api.scholars();
      if (scholars.ok) for (const s of scholars.data.scholars) out.push(entry(`/ao/scholar/${s.id}`, 0.3));
      return out;
    }

    const [kind, rawPage] = id.split("-");
    const page = Number.parseInt(rawPage, 10);
    if (kind !== "n" || !Number.isInteger(page) || page < 0) return [];

    const res = await api.sitemapNarrators(page);
    return res.ok ? res.data.ids.map((n) => entry(`/ao/narrator/${n}`, 0.4)) : [];
  } catch (error) {
    console.warn(`[sitemap] jarh wa ta'dil sitemap ${id} unavailable; it will be rebuilt on the next revalidation.`, error);
  }
  return [];
}
