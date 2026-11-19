import { Metadata, NextPage } from "next";
import Client from "@/app/[locale]/c/client";
import { breadcrumbJsonLd, buildMetadata, crumbs, JsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    title: "Christianity — Bible, Church Fathers & Theology",
    description:
      "Christian scripture and scholarship on Scriptium: the Bible, apocrypha, exegesis, the Church Fathers, councils and creeds, dogmatics and canon law. Coming soon.",
    path: `/${locale}/c`,
    locale,
    // TODO: Only "coming soon" placeholders so far: keep it out of search results until it has content.
    noindex: true,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          crumbs.home(locale),
          { name: "Christianity", path: `/${locale}/c` },
        ])}
      />
      <Client />
    </>
  );
};

export default Page;
