import { Metadata, NextPage } from "next";
import { cache } from "react";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import TopicClient from "@/app/[locale]/i/h/ao/topic/client";
import { positiveInt, statusView } from "@/app/[locale]/i/h/ao/components/StatusView";
import { breadcrumbJsonLd, buildMetadata, crumbs, errorMetadata, hadithCrumbs, JsonLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; id: string }> };

const getTopic = cache((id: number) => BackendApi.HadithArabicOnlyController.topic(id));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const tid = positiveInt(id);
  if (!tid) return errorMetadata("Subject not found");
  const res = await getTopic(tid);
  if (!res.ok || !res.data.topic) return errorMetadata(res.status === 404 ? "Subject not found" : "Error");
  const path = [...res.data.path.map((p) => p.name), res.data.topic.name].join(" › ");
  return buildMetadata({
    title: `${res.data.topic.name} — Hadith on this Subject`,
    description: `Hadith on: ${path}. ${res.data.children.length} sub-entries.`,
    path: `/${locale}/i/h/ao/topic/${tid}`,
    locale,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale, id } = await params;
  const tid = positiveInt(id);
  const res = tid ? await getTopic(tid) : null;
  const error = statusView(res?.status ?? 404);
  if (error || !res) return error;
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          ...hadithCrumbs(locale),
          crumbs.hadithTopics(locale),
          ...res.data.path.map((p) => ({ name: p.name, path: `/${locale}/i/h/ao/topic/${p.id}` })),
          { name: res.data.topic?.name ?? "", path: `/${locale}/i/h/ao/topic/${tid}` },
        ])}
      />
      <TopicClient topic={res.data} />
    </>
  );
};

export default Page;
