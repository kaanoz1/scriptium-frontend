import { Metadata, NextPage } from "next";
import { buildMetadata, JsonLd, websiteJsonLd } from "@/lib/seo";
import Client from "./client";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    title:
      "Scriptium — Read the Qur'an with Translations, Word Roots & Analysis",
    description:
      "Read the Qur'an in Arabic with translations, transliteration and word-by-word analysis, and search every Arabic root. An open theology library of sacred texts and scholarship.",
    path: `/${locale}`,
    locale,
    absoluteTitle: true,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={websiteJsonLd(locale)} />
      <Client />
    </>
  );
};

export default Page;
