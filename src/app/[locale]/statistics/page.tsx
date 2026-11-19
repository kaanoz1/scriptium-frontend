import { Metadata, NextPage } from "next";
import ThisPageIsUnderConstruction from "@/util/components/ThisPageIsUnderConstruction";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    title: "Statistics",
    description:
      "Statistics about the texts, translations and roots in the Scriptium library.",
    path: `/${locale}/statistics`,
    locale,
    // TODO: Under construction: keep it out of search results until it has content.
    noindex: true,
  });
}

const Page: NextPage<Props> = () => <ThisPageIsUnderConstruction />;

export default Page;
