import { Metadata, NextPage } from "next";
import Client from "@/app/[locale]/about/client";
import { breadcrumbJsonLd, buildMetadata, crumbs, JsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    title: "About Scriptium — An Open Library of Sacred Texts",
    description:
      "Learn about Scriptium: a platform that collects, structures and presents the world's theological and philosophical sources, starting with the Qur'an, in a modern, accessible format.",
    path: `/${locale}/about`,
    locale,
    absoluteTitle: true,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          crumbs.home(locale),
          { name: "About", path: `/${locale}/about` },
        ])}
      />
      <Client />
    </>
  );
};

export default Page;
