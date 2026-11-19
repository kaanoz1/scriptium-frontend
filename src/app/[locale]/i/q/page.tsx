import { Metadata, NextPage } from "next";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import { ResponseCodes } from "@/util/types/ResponseCodes";
import UnknownError from "@/util/components/Error/UnknownError";
import ServerError from "@/util/components/Error/ServerError";
import RateLimitError from "@/util/components/Error/RateLimitError";
import Client from "@/app/[locale]/i/q/client";
import { breadcrumbJsonLd, buildMetadata, crumbs, JsonLd } from "@/lib/seo";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    title: "The Holy Qur'an — All 114 Surahs with Translations",
    description:
      "Browse all 114 surahs of the Qur'an. Read each chapter in Arabic with English translations, transliteration and word-by-word analysis.",
    path: `/${locale}/i/q`,
    locale,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale } = await params;

  const response = await BackendApi.ChapterController.list();

  switch (response.status) {
    case ResponseCodes.OK:
      return (
        <>
          <JsonLd
            data={breadcrumbJsonLd([
              crumbs.home(locale),
              crumbs.islam(locale),
              crumbs.quran(locale),
            ])}
          />
          <Client chapters={response.data} />
        </>
      );
    case ResponseCodes.NOT_FOUND:
      notFound();
    case ResponseCodes.TOO_MANY_REQUESTS:
      return <RateLimitError />;
    case ResponseCodes.INTERNAL_SERVER_ERROR:
      return <ServerError />;
    case ResponseCodes.UNKNOWN_ERROR:
    default:
      return <UnknownError fullPage />;
  }
};

export default Page;
