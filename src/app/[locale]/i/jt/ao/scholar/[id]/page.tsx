import { Metadata, NextPage } from "next";
import { cache } from "react";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import Client from "@/app/[locale]/i/jt/ao/scholar/[id]/client";
import { positiveInt, SearchParams, statusView } from "@/app/[locale]/i/h/ao/components/StatusView";
import { breadcrumbJsonLd, buildMetadata, crumbs, errorMetadata, jarhTadilCrumbs, JsonLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; id: string }>; searchParams: SearchParams };

const getScholar = cache((id: number) => BackendApi.JarhTadilArabicOnlyController.scholar(id));

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const sid = positiveInt(id);
  if (!sid) return errorMetadata("Scholar not found");
  const res = await getScholar(sid);
  if (!res.ok) return errorMetadata(res.status === 404 ? "Scholar not found" : "Error");
  const s = res.data;
  const sp = await searchParams;
  return buildMetadata({
    title: `${s.knownAs} — Statements on Hadith Narrators`,
    description: `${s.name}${s.deathYear ? ` (d. ${s.deathYear} AH)` : ""}: ${s.statementCount.toLocaleString("en")} jarh wa ta'dil statements about hadith narrators.`,
    path: `/${locale}/i/jt/ao/scholar/${s.id}`,
    locale,
    noindex: Boolean(sp.page),
  });
}

const Page: NextPage<Props> = async ({ params, searchParams }) => {
  const { locale, id } = await params;
  const sid = positiveInt(id);
  const page = positiveInt((await searchParams).page) ?? 1;
  const scholar = sid ? await getScholar(sid) : null;
  const error = statusView(scholar?.status ?? 404);
  if (error || !scholar) return error;
  const statements = await BackendApi.JarhTadilArabicOnlyController.scholarStatements(sid!, page, 50);
  const listError = statusView(statements.status);
  if (listError) return listError;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          ...jarhTadilCrumbs(locale),
          crumbs.scholars(locale),
          { name: scholar.data.knownAs, path: `/${locale}/i/jt/ao/scholar/${scholar.data.id}` },
        ])}
      />
      <Client scholar={scholar.data} statements={statements.data} />
    </>
  );
};

export default Page;
