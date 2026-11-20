import { Metadata, NextPage } from "next";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import Client from "@/app/[locale]/i/h/ao/quran/[chapter]/[verse]/client";
import { positiveInt, SearchParams, statusView } from "@/app/[locale]/i/h/ao/components/StatusView";
import { buildMetadata, errorMetadata } from "@/lib/seo";
import { VerseCountIndicator } from "@/util/Islam/Quran/Chapter/VerseCountIndicator";

type Props = { params: Promise<{ locale: string; chapter: string; verse: string }>; searchParams: SearchParams };

const parse = (c: string, v: string): [number, number] | null => {
  const ch = positiveInt(c);
  const vs = positiveInt(v);
  if (!ch || ch > 114 || !vs || vs > VerseCountIndicator[ch - 1]) return null;
  return [ch, vs];
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale, chapter, verse } = await params;
  const ref = parse(chapter, verse);
  if (!ref) return errorMetadata("Verse not found");
  const sp = await searchParams;
  return buildMetadata({
    title: `Hadith Citing Qur'an ${ref[0]}:${ref[1]}`,
    description: `Hadith narrations that quote verse ${ref[0]}:${ref[1]} of the Qur'an, in Arabic with their grades.`,
    path: `/${locale}/i/h/ao/quran/${ref[0]}/${ref[1]}`,
    locale,
    noindex: Boolean(sp.page),
  });
}

const Page: NextPage<Props> = async ({ params, searchParams }) => {
  const { chapter, verse } = await params;
  const ref = parse(chapter, verse);
  const page = positiveInt((await searchParams).page) ?? 1;
  const res = ref ? await BackendApi.HadithArabicOnlyController.quranVerseHadiths(ref[0], ref[1], page, 20) : null;
  const error = statusView(res?.status ?? 404);
  if (error || !res || !ref) return error;
  return <Client chapter={ref[0]} verse={ref[1]} hadiths={res.data} />;
};

export default Page;
