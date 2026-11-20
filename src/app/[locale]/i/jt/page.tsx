import { Metadata, NextPage } from "next";
import Client from "@/app/[locale]/i/jt/client";
import { breadcrumbJsonLd, buildMetadata, crumbs, JsonLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Jarh wa Ta'dil — Hadith Narrators and Their Critics",
    description:
      "Biographies of hadith narrators with their teachers and students, and the statements of the critics of jarh wa ta'dil on their reliability.",
    path: `/${locale}/i/jt`,
    locale,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale } = await params;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([crumbs.home(locale), crumbs.islam(locale), crumbs.jarhTadil(locale)])} />
      <Client />
    </>
  );
};

export default Page;
