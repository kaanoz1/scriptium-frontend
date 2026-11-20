import { Metadata, NextPage } from "next";
import { buildMetadata, JsonLd, websiteJsonLd } from "@/lib/seo";
import Client from "./client";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    title: "Scriptium — Theology Library of Sacred Texts & Scholarship",
    description:
      "An open theology library that collects and presents the world's sacred texts, theological and philosophical sources in a modern, accessible format.",
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
