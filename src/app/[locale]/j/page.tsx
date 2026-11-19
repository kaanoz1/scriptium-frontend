import { Metadata, NextPage } from "next";
import Client from "@/app/[locale]/j/client";
import { breadcrumbJsonLd, buildMetadata, crumbs, JsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    title: "Judaism — Tanakh, Talmud & Rabbinic Literature",
    description:
      "Jewish scripture and scholarship on Scriptium: the Tanakh, Mishnah, Talmud, Midrash, Targum, Halakha, responsa and Kabbalah. Coming soon.",
    path: `/${locale}/j`,
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
          { name: "Judaism", path: `/${locale}/j` },
        ])}
      />
      <Client />
    </>
  );
};

export default Page;
