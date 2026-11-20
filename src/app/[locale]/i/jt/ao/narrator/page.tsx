import { Metadata, NextPage } from "next";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import Client from "@/app/[locale]/i/jt/ao/narrator/client";
import { intInRange, positiveInt, SearchParams, statusView } from "@/app/[locale]/i/h/ao/components/StatusView";
import { breadcrumbJsonLd, buildMetadata, crumbs, jarhTadilCrumbs, JsonLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }>; searchParams: SearchParams };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  return buildMetadata({
    title: "Hadith Narrators (Rijal) — Grades, Teachers and Students",
    description:
      "Browse about 50,000 hadith narrators with their reliability grades, dates, teachers, students, jarh wa ta'dil statements and every hadith they transmitted.",
    path: `/${locale}/i/jt/ao/narrator`,
    locale,
    noindex: Boolean(sp.q || sp.page || sp.rank),
  });
}

const Page: NextPage<Props> = async ({ params, searchParams }) => {
  const { locale } = await params;
  const sp = await searchParams;
  const query = typeof sp.q === "string" ? sp.q.slice(0, 100) : "";
  const page = positiveInt(sp.page) ?? 1;
  const rank = intInRange(sp.rank, 0, 12);
  const bukhari = sp.bukhari === "1";
  const muslim = sp.muslim === "1";

  const res = await BackendApi.JarhTadilArabicOnlyController.narrators({ query, rank, bukhari, muslim, page, pageSize: 36 });
  const error = statusView(res.status);
  if (error) return error;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([...jarhTadilCrumbs(locale), crumbs.narrators(locale)])} />
      <Client page={res.data} query={query} rank={rank} />
    </>
  );
};

export default Page;
