import { Metadata, NextPage } from "next";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import Client from "@/app/[locale]/i/h/ao/topic/client";
import { statusView } from "@/app/[locale]/i/h/ao/components/StatusView";
import { breadcrumbJsonLd, buildMetadata, crumbs, hadithCrumbs, JsonLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Hadith by Subject — Topical Index",
    description: "Browse hadith by subject: faith, knowledge, worship, transactions, ethics, the sira (biography) and more, down to individual reports.",
    path: `/${locale}/i/h/ao/topic`,
    locale,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale } = await params;
  const res = await BackendApi.HadithArabicOnlyController.topics();
  const error = statusView(res.status);
  if (error) return error;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([...hadithCrumbs(locale), crumbs.hadithTopics(locale)])} />
      <Client topic={res.data} />
    </>
  );
};

export default Page;
