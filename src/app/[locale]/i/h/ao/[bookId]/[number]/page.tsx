import { Metadata, NextPage } from "next";
import { cache } from "react";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import Client from "@/app/[locale]/i/h/ao/[bookId]/[number]/client";
import { positiveInt, statusView } from "@/app/[locale]/i/h/ao/components/StatusView";
import { breadcrumbJsonLd, buildMetadata, errorMetadata, hadithCrumbs, JsonLd, truncate } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; bookId: string; number: string }> };

const getHadith = cache((bookId: number, number: number) =>
  BackendApi.HadithArabicOnlyController.hadith(bookId, number),
);

const GRADE_EN: Record<number, string> = {
  0: "Sahih",
  1: "Hasan",
  2: "Da'if",
  3: "Very weak",
  4: "Accused of forgery",
  5: "Fabricated",
  6: "Mawquf",
  7: "Maqtu'",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, bookId, number } = await params;
  const b = positiveInt(bookId);
  const n = positiveInt(number);
  if (!b || !n) return errorMetadata("Hadith not found");
  const res = await getHadith(b, n);
  if (!res.ok) return errorMetadata(res.status === 404 ? "Hadith not found" : "Error");
  const h = res.data;
  const matn = h.matnStart !== null && h.matnEnd !== null ? h.text.slice(h.matnStart, h.matnEnd) : h.text;
  const grade = GRADE_EN[h.grade];
  return buildMetadata({
    title: `${h.book.name} ${h.number}${grade ? ` (${grade})` : ""}`,
    description: truncate(matn),
    path: `/${locale}/i/h/ao/${h.book.id}/${h.number}`,
    locale,
    type: "article",
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale, bookId, number } = await params;
  const b = positiveInt(bookId);
  const n = positiveInt(number);
  const res = b && n ? await getHadith(b, n) : null;
  const error = statusView(res?.status ?? 404);
  if (error || !res) return error;
  const h = res.data;
  const path = `/${locale}/i/h/ao/${h.book.id}/${h.number}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            ...hadithCrumbs(locale),
            { name: h.book.name, path: `/${locale}/i/h/ao/${h.book.id}` },
            { name: String(h.number), path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Quotation",
            inLanguage: "ar",
            text: h.matnStart !== null && h.matnEnd !== null ? h.text.slice(h.matnStart, h.matnEnd) : h.text,
            isPartOf: { "@type": "Book", name: h.book.name, author: { "@type": "Person", name: h.book.authorName } },
          },
        ]}
      />
      <Client hadith={h} />
    </>
  );
};

export default Page;
