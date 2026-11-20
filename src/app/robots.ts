import { SITE_URL } from "@/configuration";
import { MetadataRoute } from "next";
import { hadithSitemapIds } from "@/app/sitemaps/hadith/sitemap";
import { jarhTadilSitemapIds } from "@/app/sitemaps/jarh-tadil/sitemap";

export const revalidate = 86400;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const [hadithIds, jarhTadilIds] = await Promise.all([hadithSitemapIds(), jarhTadilSitemapIds()]);
  const hadith = hadithIds.map(({ id }) => `${SITE_URL}/sitemaps/hadith/sitemap/${id}.xml`);
  const jarhTadil = jarhTadilIds.map(({ id }) => `${SITE_URL}/sitemaps/jarh-tadil/sitemap/${id}.xml`);
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/test", "/test/*"],
    },
    sitemap: [`${SITE_URL}/sitemap.xml`, ...hadith, ...jarhTadil],
    host: SITE_URL,
  };
}
