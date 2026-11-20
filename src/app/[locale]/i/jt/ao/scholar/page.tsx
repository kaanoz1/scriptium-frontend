import { Metadata, NextPage } from "next";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import Client from "@/app/[locale]/i/jt/ao/scholar/client";
import { statusView } from "@/app/[locale]/i/h/ao/components/StatusView";
import { breadcrumbJsonLd, buildMetadata, crumbs, jarhTadilCrumbs, JsonLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Jarh wa Ta'dil Scholars — Critics of Hadith Narrators",
    description:
      "The scholars of narrator criticism and everything they said about hadith transmitters: over 1,000 critics and 127,000 statements.",
    path: `/${locale}/i/jt/ao/scholar`,
    locale,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale } = await params;
  const res = await BackendApi.JarhTadilArabicOnlyController.scholars();
  const error = statusView(res.status);
  if (error) return error;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([...jarhTadilCrumbs(locale), crumbs.scholars(locale)])} />
      <Client scholars={res.data.scholars} />
    </>
  );
};

export default Page;
