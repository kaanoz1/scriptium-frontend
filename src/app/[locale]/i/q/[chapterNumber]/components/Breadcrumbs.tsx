"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { useLocale, useTranslations } from "next-intl";
import { ChapterComplete } from "@/classes/Islam/Quran/Chapter/Complete";
import PageBreadcrumbs from "@/components/Page/PageBreadcrumbs";

type Props = {
  chapter: ChapterComplete;
};

const Breadcrumbs: React.FC<Props> = observer(({ chapter }) => {
  const locale = useLocale();
  const t = useTranslations("Terms.Islam");

  const meaning = chapter.meanings.find((m) => m.language.code === locale)?.text;

  return (
    <PageBreadcrumbs
      items={[
        { label: t("this"), href: `/${locale}/i`, hideOnMobile: true },
        { label: t("Quran.this"), href: `/${locale}/i/q` },
        { label: meaning ? `${chapter.sequence}. ${meaning}` : chapter.sequence },
      ]}
    />
  );
});

export default Breadcrumbs;
