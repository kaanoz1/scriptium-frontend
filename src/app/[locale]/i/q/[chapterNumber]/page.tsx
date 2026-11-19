import { Metadata, NextPage } from "next";
import { cache } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { ResponseCodes } from "@/util/types/ResponseCodes";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import UnknownError from "@/util/components/Error/UnknownError";
import ServerError from "@/util/components/Error/ServerError";
import RateLimitError from "@/util/components/Error/RateLimitError";
import Client from "@/app/[locale]/i/q/[chapterNumber]/client";
import {
  breadcrumbJsonLd,
  buildMetadata,
  crumbs,
  errorMetadata,
  JsonLd,
} from "@/lib/seo";

type Props = {
  params: Promise<{ chapterNumber: string; locale: string }>;
};

const getChapterData = cache(async (num: number) =>
  BackendApi.ChapterController.get(num),
);

const parseChapter = (raw: string): number | null => {
  const n = Number.parseInt(raw, 10);
  return Number.isInteger(n) && n >= 1 && n <= 114 ? n : null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapterNumber, locale } = await params;
  const num = parseChapter(chapterNumber);
  if (num === null) return errorMetadata("Chapter not found");

  const response = await getChapterData(num);
  if (response.status !== ResponseCodes.OK || !response.data)
    return errorMetadata("Error");

  const chapter = response.data;
  // e.g. "Al-Baqarah (The Cow)"
  const meaning =
    chapter.meanings.find((m) => m.language.code === locale)?.text ??
    chapter.meanings.find((m) => m.language.code === "en")?.text ??
    chapter.name;
  const verseCount = chapter.verses.length;

  return buildMetadata({
    title: `Surah ${meaning} — Qur'an Chapter ${num}`,
    description: `Read Surah ${meaning}, chapter ${num} of the Qur'an (${chapter.name}): all ${verseCount} verses in Arabic with English translation, transliteration and word-by-word analysis.`,
    path: `/${locale}/i/q/${num}`,
    locale,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { chapterNumber, locale } = await params;
  const num = parseChapter(chapterNumber);

  if (num === null) notFound();

  // "/i/q/02" or "/i/q/2abc" would otherwise be duplicates of "/i/q/2".
  if (chapterNumber !== String(num)) permanentRedirect(`/${locale}/i/q/${num}`);

  const response = await getChapterData(num);

  switch (response.status) {
    case ResponseCodes.OK: {
      const meaning =
        response.data.meanings.find((m) => m.language.code === locale)?.text ??
        response.data.name;
      return (
        <>
          <JsonLd
            data={breadcrumbJsonLd([
              crumbs.home(locale),
              crumbs.islam(locale),
              crumbs.quran(locale),
              { name: `${num}. ${meaning}`, path: `/${locale}/i/q/${num}` },
            ])}
          />
          <Client chapter={response.data} />
        </>
      );
    }
    case ResponseCodes.NOT_FOUND:
      notFound();
    case ResponseCodes.TOO_MANY_REQUESTS:
      return <RateLimitError />;
    case ResponseCodes.INTERNAL_SERVER_ERROR:
      return <ServerError />;
    case ResponseCodes.UNKNOWN_ERROR:
    default:
      return <UnknownError />;
  }
};

export default Page;
