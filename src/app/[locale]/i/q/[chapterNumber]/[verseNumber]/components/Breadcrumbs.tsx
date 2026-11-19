"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { useLocale, useTranslations } from "next-intl";
import { VerseBoth } from "@/classes/Islam/Quran/Verse/Both";
import PageBreadcrumbs from "@/components/Page/PageBreadcrumbs";

type Props = {
  verse: VerseBoth;
};

const Breadcrumbs: React.FC<Props> = observer(({ verse }) => {
  const locale = useLocale();
  const t = useTranslations("Terms.Islam");

  const chapter = verse.chapter;
  const meaning = chapter.meanings.find((m) => m.language.code === locale)?.text;

  return (
    <PageBreadcrumbs
      className="[&>ol]:border-0 [&>ol]:bg-transparent [&>ol]:shadow-none"
      items={[
        { label: t("this"), href: `/${locale}/i`, hideOnMobile: true },
        { label: t("Quran.this"), href: `/${locale}/i/q`, hideOnMobile: true },
        {
          label: meaning ? `${chapter.sequence}. ${meaning}` : chapter.sequence,
          href: `/${locale}/i/q/${chapter.sequence}`,
        },
        { label: `${t("Quran.Verse.this")} ${verse.sequence}` },
      ]}
    />
  );
});

export default Breadcrumbs;
