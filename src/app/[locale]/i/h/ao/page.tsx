import { Metadata, NextPage } from "next";
import { cache } from "react";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import Client from "@/app/[locale]/i/h/ao/client";
import { statusView } from "@/app/[locale]/i/h/ao/components/StatusView";
import { breadcrumbJsonLd, buildMetadata, hadithCrumbs, JsonLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const getOverview = cache(() => BackendApi.HadithArabicOnlyController.overview());

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Arabic Hadith Corpus — 425 Books, Chains and Narrators",
    description:
      "Search and read over 700,000 hadith narrations from 425 classical books in Arabic: Sahih al-Bukhari, Sahih Muslim, the Sunan, Musnad Ahmad and more, with chains of narration and narrator grades.",
    path: `/${locale}/i/h/ao`,
    locale,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale } = await params;
  const overview = await getOverview();

  const error = statusView(overview.status);
  if (error) return error;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(hadithCrumbs(locale))} />
      <Client overview={overview.data} />
    </>
  );
};

export default Page;
