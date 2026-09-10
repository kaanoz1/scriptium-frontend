import { Metadata, NextPage } from "next";
import { cache } from "react";
import { SUPPORTED_LOCALES } from "@/locale/SupportedLocales/_index";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import { ResponseCodes } from "@/util/types/ResponseCodes";
import Client from "@/app/[locale]/i/q/root/[latin]/client";
import { ServerUtils } from "@/util/ServerUtils";
import NotFoundError from "@/util/components/Error/NotFoundError";
import RateLimitError from "@/util/components/Error/RateLimitError";
import ServerError from "@/util/components/Error/ServerError";
import UnknownError from "@/util/components/Error/UnknownError";
import { SITE_URL } from "@/configuration";

type Props = {
  params: Promise<{ latin: string; locale: string }>;
};

const getRootData = cache(async (latin: string) => {
  return await BackendApi.RootController.get(latin);
});

const Page: NextPage<Props> = async ({ params }) => {
  const { locale, latin } = await params;

  const response = await getRootData(latin);

  switch (response.status) {
    case ResponseCodes.OK:
      const currentUrl = `${SITE_URL}/${locale}/i/q/root/${latin}`;
      await ServerUtils.General.Pages.upsertUrlToSitemap(currentUrl);

      return <Client root={response.data} />;
    case ResponseCodes.NOT_FOUND:
      return <NotFoundError />;
    case ResponseCodes.TOO_MANY_REQUESTS:
      return <RateLimitError />;
    case ResponseCodes.INTERNAL_SERVER_ERROR:
      return <ServerError />;
    case ResponseCodes.UNKNOWN_ERROR:
    default:
      return <UnknownError />;
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, latin } = await params;

  const currentLocale = (locale as keyof typeof SUPPORTED_LOCALES) || "en";

  const notFoundTitles: Record<keyof typeof SUPPORTED_LOCALES, string> = {
    en: "Root Not Found - Scriptium",
    tr: "Kök Bulunamadı - Scriptium",
  };

  const errorTitles: Record<keyof typeof SUPPORTED_LOCALES, string> = {
    en: "Error - Scriptium",
    tr: "Hata - Scriptium",
  };

  const response = await getRootData(latin);

  if (response.status === ResponseCodes.NOT_FOUND) {
    return {
      title: { absolute: notFoundTitles[currentLocale] || notFoundTitles.en },
    };
  }

  if (response.status !== ResponseCodes.OK || !response.data) {
    return {
      title: { absolute: errorTitles[currentLocale] || errorTitles.en },
    };
  }

  const titleMap: Record<keyof typeof SUPPORTED_LOCALES, string> = {
    en: `Scriptium - Root: ${latin}`,
    tr: `Scriptium - Kök: ${latin}`,
  };

  const descriptionMap: Record<keyof typeof SUPPORTED_LOCALES, string> = {
    en: `Scriptium - Root: ${latin} - Origins and details.`,
    tr: `Scriptium - Kök: ${latin} - Kelime kökenleri ve detayları.`,
  };

  const title = titleMap[currentLocale] || titleMap["en"];
  const description = descriptionMap[currentLocale] || descriptionMap["en"];
  const path = `/${locale}/i/q/root/${latin}`;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
    },
  };
}

export default Page;
