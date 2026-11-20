import { Metadata, NextPage } from "next";
import Client from "@/app/[locale]/i/h/client";
import { breadcrumbJsonLd, buildMetadata, crumbs, JsonLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Hadith — Reports and Their Chains of Narration",
    description:
      "Read hadith collections in the original Arabic with every chain of narration, narrator biographies, jarh wa ta'dil statements and the subject index.",
    path: `/${locale}/i/h`,
    locale,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale } = await params;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([crumbs.home(locale), crumbs.islam(locale), crumbs.hadith(locale)])} />
      <Client />
    </>
  );
};

export default Page;
