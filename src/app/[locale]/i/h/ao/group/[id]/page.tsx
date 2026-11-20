import { Metadata, NextPage } from "next";
import { cache } from "react";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import Client from "@/app/[locale]/i/h/ao/group/[id]/client";
import { intInRange, positiveInt, SearchParams, statusView } from "@/app/[locale]/i/h/ao/components/StatusView";
import { breadcrumbJsonLd, buildMetadata, errorMetadata, hadithCrumbs, JsonLd, truncate } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; id: string }>; searchParams: SearchParams };

const getGroup = cache((id: number) => BackendApi.HadithArabicOnlyController.group(id));

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const gid = positiveInt(id);
  if (!gid) return errorMetadata("Not found");
  const res = await getGroup(gid);
  if (!res.ok) return errorMetadata(res.status === 404 ? "Not found" : "Error");
  const g = res.data.group;
  const sp = await searchParams;
  return buildMetadata({
    title: `${truncate(g.text, 60)} — All Narrations`,
    description: `${g.hadithCount.toLocaleString("en")} narrations of this hadith across ${res.data.books.length} books, with ${res.data.chainCount.toLocaleString("en")} chains and the merged isnad tree.`,
    path: `/${locale}/i/h/ao/group/${g.id}`,
    locale,
    noindex: Boolean(sp.page || sp.book || sp.grade),
  });
}

const Page: NextPage<Props> = async ({ params, searchParams }) => {
  const { locale, id } = await params;
  const gid = positiveInt(id);
  const sp = await searchParams;
  const page = positiveInt(sp.page) ?? 1;
  const book = positiveInt(sp.book);
  const grade = intInRange(sp.grade, -1, 8);
  const api = BackendApi.HadithArabicOnlyController;

  const group = gid ? await getGroup(gid) : null;
  const error = statusView(group?.status ?? 404);
  if (error || !group) return error;

  const [hadiths, isnad] = await Promise.all([api.groupHadiths(gid!, { page, pageSize: 20, book, grade }), api.groupIsnad(gid!)]);
  const listError = statusView(hadiths.status);
  if (listError) return listError;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([...hadithCrumbs(locale), { name: truncate(group.data.group.text, 60), path: `/${locale}/i/h/ao/group/${gid}` }])} />
      <Client group={group.data} hadiths={hadiths.data} isnad={isnad.ok ? isnad.data : null} activeBook={book} />
    </>
  );
};

export default Page;
