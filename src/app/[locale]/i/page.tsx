import { Metadata, NextPage } from "next";
import Client from "@/app/[locale]/i/client";
import { breadcrumbJsonLd, buildMetadata, crumbs, JsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    title: "Islam — the Qur'an and the Islamic Sciences",
    description:
      "Read the Qur'an with translations and word-by-word analysis, and explore the classical Islamic sciences: tafsir, hadith, jarh wa ta'dil, fiqh, kalam and more.",
    path: `/${locale}/i`,
    locale,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([crumbs.home(locale), crumbs.islam(locale)])}
      />
      <Client />
    </>
  );
};

export default Page;
