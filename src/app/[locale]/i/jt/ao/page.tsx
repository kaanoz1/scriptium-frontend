import { Metadata, NextPage } from "next";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import Client from "@/app/[locale]/i/jt/ao/client";
import { statusView } from "@/app/[locale]/i/h/ao/components/StatusView";
import { breadcrumbJsonLd, buildMetadata, jarhTadilCrumbs, JsonLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Arabic Jarh wa Ta'dil Corpus — 50,000 Narrators and Their Critics",
    description:
      "Browse about 50,000 hadith narrators with their grades, teachers and students, and over 127,000 statements by more than 1,000 critics of jarh wa ta'dil, in Arabic.",
    path: `/${locale}/i/jt/ao`,
    locale,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale } = await params;
  const overview = await BackendApi.JarhTadilArabicOnlyController.overview();
  const error = statusView(overview.status);
  if (error) return error;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(jarhTadilCrumbs(locale))} />
      <Client overview={overview.data} />
    </>
  );
};

export default Page;
