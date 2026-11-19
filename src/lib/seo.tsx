import type { Metadata } from "next";
import { SITE_URL } from "@/configuration";

/**
 * Central SEO helpers. Every page should build its metadata through
 * `buildMetadata` so canonical URLs, Open Graph and Twitter cards stay
 * consistent (Next.js replaces `openGraph` wholesale when a page sets it, so
 * without this the default image, site name and locale were being dropped).
 */

export const SITE_NAME = "Scriptium";
export const DEFAULT_DESCRIPTION =
  "Scriptium is an open library of sacred texts and theological sources.";
export const DEFAULT_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};
export const TWITTER_HANDLE = "@scriptium_en";
export const SOCIAL_PROFILES = [
  "https://x.com/scriptium_en",
  "https://instagram.com/scriptium_en",
  "https://github.com/scriptium",
];

const OG_LOCALES: Record<string, string> = { en: "en_US", tr: "tr_TR" };

type BuildMetadataOptions = {
  /** Page title without the site name; the layout's template appends " | Scriptium". */
  title: string;
  description: string;
  /** Path including the locale, e.g. "/en/i/q/2". */
  path: string;
  locale: string;
  /** Use the title as-is (no " | Scriptium" suffix), e.g. for the home page. */
  absoluteTitle?: boolean;
  /** Keep the page out of search results but let crawlers follow its links. */
  noindex?: boolean;
  type?: "website" | "article";
};

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const buildMetadata = ({
  title,
  description,
  path,
  locale,
  absoluteTitle = false,
  noindex = false,
  type = "website",
}: BuildMetadataOptions): Metadata => {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      // Only English is live. Add a key per locale here once more are enabled.
      languages: { [locale]: path, "x-default": path },
    },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: path,
      locale: OG_LOCALES[locale] ?? OG_LOCALES.en,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
};

/** Metadata for error/empty states: never index them. */
export const errorMetadata = (title: string): Metadata => ({
  title,
  robots: { index: false, follow: false },
});

/** Shorten text for meta descriptions (~155 chars), cutting at a word boundary. */
export const truncate = (text: string, max = 155): string => {
  const clean = text
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,.;:\s]+$/, "")}…`;
};

/* ---------- JSON-LD structured data ---------- */

export const JsonLd: React.FC<{
  data: Record<string, unknown> | Record<string, unknown>[];
}> = ({ data }) => (
  <script
    type="application/ld+json"
    // Escape "<" so content can never close the script tag.
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    }}
  />
);

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const websiteJsonLd = (locale: string) => [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl(`/${locale}`),
    inLanguage: locale,
    description: DEFAULT_DESCRIPTION,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/icon/scriptium-light-theme-icon-512x512.png"),
    email: "info@scriptium.net",
    sameAs: SOCIAL_PROFILES,
  },
];

/** Common breadcrumb prefixes. */
export const crumbs = {
  home: (locale: string) => ({ name: "Home", path: `/${locale}` }),
  islam: (locale: string) => ({ name: "Islam", path: `/${locale}/i` }),
  quran: (locale: string) => ({ name: "Qur'an", path: `/${locale}/i/q` }),
  roots: (locale: string) => ({ name: "Roots", path: `/${locale}/i/q/root` }),
};
