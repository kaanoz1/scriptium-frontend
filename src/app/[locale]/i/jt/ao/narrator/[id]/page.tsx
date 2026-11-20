import { Metadata, NextPage } from "next";
import { cache } from "react";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import Client from "@/app/[locale]/i/jt/ao/narrator/[id]/client";
import { intInRange, positiveInt, SearchParams, statusView } from "@/app/[locale]/i/h/ao/components/StatusView";
import { breadcrumbJsonLd, buildMetadata, crumbs, errorMetadata, jarhTadilCrumbs, JsonLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; id: string }>; searchParams: SearchParams };

const getNarrator = cache((id: number) => BackendApi.JarhTadilArabicOnlyController.narrator(id));

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const nid = positiveInt(id);
  if (!nid) return errorMetadata("Narrator not found");
  const res = await getNarrator(nid);
  if (!res.ok) return errorMetadata(res.status === 404 ? "Narrator not found" : "Error");
  const n = res.data;
  const sp = await searchParams;
  return buildMetadata({
    title: `${n.nickname || n.name} — Hadith Narrator`,
    description: `${n.name}${n.rank ? ` (${n.rank})` : ""}${n.deathYear ? `, d. ${n.deathYear} AH` : ""}: narrator in ${n.hadithCount.toLocaleString("en")} hadiths, ${n.teacherCount} teachers, ${n.studentCount} students and ${n.statements.length} critics' statements.`,
    path: `/${locale}/i/jt/ao/narrator/${n.id}`,
    locale,
    noindex: n.isStub || Boolean(sp.page || sp.book || sp.grade),
  });
}

const Page: NextPage<Props> = async ({ params, searchParams }) => {
  const { locale, id } = await params;
  const nid = positiveInt(id);
  const sp = await searchParams;
  const page = positiveInt(sp.page) ?? 1;
  const book = positiveInt(sp.book);
  const grade = intInRange(sp.grade, -1, 8);

  const narrator = nid ? await getNarrator(nid) : null;
  const error = statusView(narrator?.status ?? 404);
  if (error || !narrator) return error;

  const hadiths = await BackendApi.JarhTadilArabicOnlyController.narratorHadiths(nid!, { page, pageSize: 20, book, grade });
  const listError = statusView(hadiths.status);
  if (listError) return listError;

  const n = narrator.data;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            ...jarhTadilCrumbs(locale),
            crumbs.narrators(locale),
            { name: n.nickname || n.name, path: `/${locale}/i/jt/ao/narrator/${n.id}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: n.name,
            alternateName: n.nickname || undefined,
            ...(n.deathPlace ? { deathPlace: n.deathPlace } : {}),
          },
        ]}
      />
      <Client narrator={n} hadiths={hadiths.data} activeBook={book} />
    </>
  );
};

export default Page;
