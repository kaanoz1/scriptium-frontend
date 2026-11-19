import { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import { ResponseCodes } from "@/util/types/ResponseCodes";
import Client from "@/app/[locale]/i/q/root/client";
import RateLimitError from "@/util/components/Error/RateLimitError";
import ServerError from "@/util/components/Error/ServerError";
import UnknownError from "@/util/components/Error/UnknownError";
import { breadcrumbJsonLd, buildMetadata, crumbs, JsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    title: "Arabic Roots of the Qur'an — Complete Root Index",
    description:
      "Browse every Arabic root in the Qur'an with its number of occurrences. Open a root to see all the words derived from it and the verses where they appear.",
    path: `/${locale}/i/q/root`,
    locale,
  });
}

const Page: NextPage<Props> = async ({ params }) => {
  const { locale } = await params;

  const response = await BackendApi.RootController.listAdvanced();

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
            ])}
          />
          <Client roots={response.data} />
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
