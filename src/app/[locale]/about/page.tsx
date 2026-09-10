import { Metadata, NextPage } from "next";
import Client from "@/app/[locale]/about/client";
import { SUPPORTED_LOCALES } from "@/locale/SupportedLocales/_index";
import { ServerUtils } from "@/util/ServerUtils";

const SITE_URL = "https://scriptium.net";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const lang = locale as keyof typeof SUPPORTED_LOCALES;

  const titleMap: Record<keyof typeof SUPPORTED_LOCALES, string> = {
    en: "About Scriptium | Theological & Philosophical Sources",
    tr: "Scriptium Hakkında | Teolojik ve Felsefi Kaynaklar",
  };

  const descriptionMap: Record<keyof typeof SUPPORTED_LOCALES, string> = {
    en: "Learn about Scriptium, a platform dedicated to collecting and presenting theological and philosophical sources with modern technology.",
    tr: "Teolojik ve felsefi kaynakları modern teknolojiyle toplama ve sunmaya adanmış bir platform olan Scriptium hakkında bilgi edinin.",
  };

  const title = titleMap[lang] || titleMap["en"];
  const description = descriptionMap[lang] || descriptionMap["en"];
  const path = `/${locale}/about`;

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

const Page: NextPage<Props> = async ({ params }) => {
  const { locale } = await params;

  const currentUrl = `${SITE_URL}/${locale}/about`;
  await ServerUtils.General.Pages.upsertUrlToSitemap(currentUrl);

  return <Client />;
};

export default Page;
