import { Metadata, NextPage } from "next";
import { cache } from "react";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import Client from "@/app/[locale]/i/h/ao/[bookId]/client";
import { intInRange, positiveInt, SearchParams, statusView } from "@/app/[locale]/i/h/ao/components/StatusView";
import { breadcrumbJsonLd, buildMetadata, errorMetadata, hadithCrumbs, JsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; bookId: string }>;
  searchParams: SearchParams;
};

const PAGE_SIZE = 25;
const getBook = cache((id: number) => BackendApi.HadithArabicOnlyController.book(id));

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale, bookId } = await params;
  const id = positiveInt(bookId);
  if (!id) return errorMetadata("Book not found");
  const res = await getBook(id);
  if (!res.ok) return errorMetadata(res.status === 404 ? "Book not found" : "Error");
  const b = res.data;
  const sp = await searchParams;
  const filtered = Boolean(sp.page || sp.grade || sp.type);
  return buildMetadata({
    title: `${b.name} — ${b.authorName}`,
    description: `${b.name} by ${b.authorName}${b.authorDeathYear ? ` (d. ${b.authorDeathYear} AH)` : ""}: ${b.hadithCount.toLocaleString("en")} hadiths in Arabic with their chains of narration and grades.`,
    path: `/${locale}/i/h/ao/${b.id}`,
    locale,
    noindex: filtered,
  });
}

const Page: NextPage<Props> = async ({ params, searchParams }) => {
  const { locale, bookId } = await params;
  const id = positiveInt(bookId);
  const sp = await searchParams;
  const page = positiveInt(sp.page) ?? 1;
  const grade = intInRange(sp.grade, -1, 8);
  const type = intInRange(sp.type, 0, 3);

  const book = await getBook(id ?? 0);
  const error = statusView(id ? book.status : 404);
  if (error) return error;

  const hadiths = await BackendApi.HadithArabicOnlyController.bookHadiths(id!, { page, pageSize: PAGE_SIZE, grade, type });
  const listError = statusView(hadiths.status);
  if (listError) return listError;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([...hadithCrumbs(locale), { name: book.data.name, path: `/${locale}/i/h/ao/${book.data.id}` }])}
      />
      <Client book={book.data} hadiths={hadiths.data} />
    </>
  );
};

export default Page;
