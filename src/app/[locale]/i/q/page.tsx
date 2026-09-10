import { Metadata, NextPage } from "next";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import { ResponseCodes } from "@/util/types/ResponseCodes";
import UnknownError from "@/util/components/Error/UnknownError";
import ServerError from "@/util/components/Error/ServerError";
import RateLimitError from "@/util/components/Error/RateLimitError";
import NotFoundError from "@/util/components/Error/NotFoundError";
import Client from "@/app/[locale]/i/q/client";
import { ServerUtils } from "@/util/ServerUtils";
import { SITE_URL } from "@/configuration";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/i/q`;

  return {
    title: {
      absolute: "Scriptium - Qur'an Chapters",
    },
    description: "All chapters from Qur'an",
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: "Scriptium - Qur'an Chapters",
      description: "All chapters from Qur'an",
      url: path,
    },
  };
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale } = await params;

  const response = await BackendApi.ChapterController.list();

  switch (response.status) {
    case ResponseCodes.OK:
      const currentUrl = `${SITE_URL}/${locale}/i/q`;
      await ServerUtils.General.Pages.upsertUrlToSitemap(currentUrl);

      return <Client chapters={response.data} />;
    case ResponseCodes.NOT_FOUND:
      return <NotFoundError />;
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
