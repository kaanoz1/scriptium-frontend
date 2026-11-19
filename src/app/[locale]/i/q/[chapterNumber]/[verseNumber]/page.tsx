import { Metadata, NextPage } from "next";
import { cache } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { ResponseCodes } from "@/util/types/ResponseCodes";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import UnknownError from "@/util/components/Error/UnknownError";
import ServerError from "@/util/components/Error/ServerError";
import RateLimitError from "@/util/components/Error/RateLimitError";
import Client from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/client";
import { VerseCountIndicator } from "@/util/Islam/Quran/Chapter/VerseCountIndicator";
import { TVerseBoth } from "@/dto/Islam/Quran/Verse/Both";
import {
  breadcrumbJsonLd,
  buildMetadata,
  crumbs,
  errorMetadata,
  JsonLd,
  truncate,
} from "@/lib/seo";

type Props = {
  params: Promise<{
    chapterNumber: string;
    verseNumber: string;
    locale: string;
  }>;
};

const DEFAULT_TRANSLATION_ID = 1;

const getVerseData = cache(async (chapter: number, verse: number) =>
  BackendApi.VerseController.get(chapter, verse),
);

const parseReference = (
  rawChapter: string,
  rawVerse: string,
): [number, number] | null => {
  const c = Number.parseInt(rawChapter, 10);
  const v = Number.parseInt(rawVerse, 10);
  // Note: the old check used `c < 114`, so every verse of surah 114 was reported as "not found".
  if (!Number.isInteger(c) || c < 1 || c > 114) return null;
  if (!Number.isInteger(v) || v < 1 || v > VerseCountIndicator[c - 1])
    return null;
  return [c, v];
};

const chapterMeaning = (verse: TVerseBoth, locale: string) =>
  verse.chapter.meanings.find((m) => m.language.code === locale)?.text ??
  verse.chapter.meanings.find((m) => m.language.code === "en")?.text ??
  verse.chapter.name;

/** Prefer the default translation, then any translation in the page's language. */
const pickTranslation = (verse: TVerseBoth, locale: string) =>
  verse.translations.find(
    (t) => t.translation.id === DEFAULT_TRANSLATION_ID && t.text,
  ) ??
  verse.translations.find(
    (t) => t.translation.language?.code === locale && t.text,
  ) ??
  verse.translations.find((t) => t.text);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapterNumber, verseNumber, locale } = await params;
  const ref = parseReference(chapterNumber, verseNumber);
  if (!ref) return errorMetadata("Verse not found");

  const [c, v] = ref;
  const response = await getVerseData(c, v);
  if (response.status !== ResponseCodes.OK || !response.data)
    return errorMetadata("Error");

  const meaning = chapterMeaning(response.data, locale);
  const translation = pickTranslation(response.data, locale);

  const description = translation
    ? truncate(`${c}:${v} — ${translation.text}`)
    : `Read verse ${v} of Surah ${meaning} (Qur'an ${c}:${v}) in Arabic with translations, transliteration and word-by-word root analysis.`;

  return buildMetadata({
    title: `Qur'an ${c}:${v} — Surah ${meaning}, Verse ${v}`,
    description,
    path: `/${locale}/i/q/${c}/${v}`,
    locale,
    type: "article",
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { chapterNumber, verseNumber, locale } = await params;
  const ref = parseReference(chapterNumber, verseNumber);

  if (!ref) notFound();

  const [c, v] = ref;

  // "/i/q/02/255" would otherwise be a duplicate of "/i/q/2/255".
  if (chapterNumber !== String(c) || verseNumber !== String(v))
    permanentRedirect(`/${locale}/i/q/${c}/${v}`);

  const response = await getVerseData(c, v);

  switch (response.status) {
    case ResponseCodes.OK: {
      const meaning = chapterMeaning(response.data, locale);
      return (
        <>
          <JsonLd
            data={breadcrumbJsonLd([
              crumbs.home(locale),
              crumbs.islam(locale),
              crumbs.quran(locale),
              { name: `${c}. ${meaning}`, path: `/${locale}/i/q/${c}` },
              { name: `Verse ${v}`, path: `/${locale}/i/q/${c}/${v}` },
            ])}
          />
          <Client verse={response.data} />
        </>
      );
    }
    case ResponseCodes.NOT_FOUND:
      notFound();
    case ResponseCodes.TOO_MANY_REQUESTS:
      return <RateLimitError />;
    case ResponseCodes.INTERNAL_SERVER_ERROR:
      return <ServerError />;
    default:
      return <UnknownError />;
  }
};

export default Page;
