import { Metadata, NextPage } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import { ResponseCodes } from "@/util/types/ResponseCodes";
import Client from "@/app/[locale]/i/q/root/[latin]/client";
import RateLimitError from "@/util/components/Error/RateLimitError";
import ServerError from "@/util/components/Error/ServerError";
import UnknownError from "@/util/components/Error/UnknownError";
import {
  breadcrumbJsonLd,
  buildMetadata,
  crumbs,
  errorMetadata,
  JsonLd,
} from "@/lib/seo";

type Props = {
  params: Promise<{ latin: string; locale: string }>;
};

const getRootData = cache(async (latin: string) =>
  BackendApi.RootController.get(latin),
);

const safeDecode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const rootPath = (locale: string, latin: string) =>
  `/${locale}/i/q/root/${encodeURIComponent(latin)}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, latin: rawLatin } = await params;
  const latin = safeDecode(rawLatin);

  const response = await getRootData(latin);
  if (response.status === ResponseCodes.NOT_FOUND)
    return errorMetadata("Root not found");
  if (response.status !== ResponseCodes.OK || !response.data)
    return errorMetadata("Error");

  const root = response.data;
  const occurrences = root.words.length;

  return buildMetadata({
    title: `Root ${root.text} (${root.latin}) — Arabic Root in the Qur'an`,
    description: `The Arabic root ${root.text} (${root.latin}) occurs ${occurrences} ${occurrences === 1 ? "time" : "times"} in the Qur'an. See every word derived from it and the verses where it appears, with translations.`,
    path: rootPath(locale, root.latin),
    locale,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale, latin: rawLatin } = await params;
  const latin = safeDecode(rawLatin);

  const response = await getRootData(latin);

  switch (response.status) {
    case ResponseCodes.OK:
      return (
        <>
          <JsonLd
            data={breadcrumbJsonLd([
              crumbs.home(locale),
              crumbs.islam(locale),
              crumbs.quran(locale),
              crumbs.roots(locale),
              {
                name: `${response.data.text} (${response.data.latin})`,
                path: rootPath(locale, response.data.latin),
              },
            ])}
          />
          <Client root={response.data} />
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
      return <UnknownError />;
  }
};

export default Page;
