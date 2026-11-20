import { Metadata, NextPage } from "next";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import Client from "@/app/[locale]/i/h/ao/search/client";
import { intInRange, positiveInt, SearchParams, statusView } from "@/app/[locale]/i/h/ao/components/StatusView";
import { buildMetadata } from "@/lib/seo";
import { THadithSearchMode } from "@/dto/Islam/Hadith/ArabicOnly";

type Props = { params: Promise<{ locale: string }>; searchParams: SearchParams };

const MODES: THadithSearchMode[] = ["Smart", "Exact", "Phrase"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Search Hadith in Arabic",
    description: "Full-text search across 715,000 hadith narrations in Arabic, with grade and book filters.",
    path: `/${locale}/i/h/ao/search`,
    locale,
    noindex: true,
  });
}

const Page: NextPage<Props> = async ({ searchParams }) => {
  const sp = await searchParams;
  const query = typeof sp.q === "string" ? sp.q.trim().slice(0, 100) : "";
  const mode = MODES.find((m) => m === sp.mode) ?? "Smart";
  const page = positiveInt(sp.page) ?? 1;
  const grade = intInRange(sp.grade, -1, 8);
  const type = intInRange(sp.type, 0, 3);
  const category = intInRange(sp.category, 1, 99);
  const book = positiveInt(sp.book);

  const [results, books] = await Promise.all([
    query.length >= 2
      ? BackendApi.HadithArabicOnlyController.search({ query, mode, page, pageSize: 20, grade, type, category, book })
      : Promise.resolve(null),
    BackendApi.HadithArabicOnlyController.books(),
  ]);
  if (results) {
    const error = statusView(results.status);
    if (error) return error;
  }

  return (
    <Client
      query={query}
      mode={mode}
      results={results?.data ?? null}
      categories={books.ok ? books.data.categories : []}
      category={category}
      book={book}
    />
  );
};

export default Page;
