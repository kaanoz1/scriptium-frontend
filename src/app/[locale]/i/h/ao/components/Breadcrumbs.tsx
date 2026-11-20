"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import PageBreadcrumbs, { Crumb } from "@/components/Page/PageBreadcrumbs";

type Props = {
  /** Crumbs after "Islam › Hadith › Arabic corpus". */
  items?: Crumb[];
  /** Stop at "Islam › Hadith" (the collections index). */
  collectionsOnly?: boolean;
};

const HadithBreadcrumbs: React.FC<Props> = ({ items = [], collectionsOnly = false }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith");
  const it = useTranslations("Terms.Islam");

  const base: Crumb[] = [
    { label: it("this"), href: `/${locale}/i` },
    { label: t("Index.Title"), href: `/${locale}/i/h` },
  ];
  if (!collectionsOnly)
    base.push({ label: t("Common.CorpusShort"), href: `/${locale}/i/h/ao` });

  return <PageBreadcrumbs items={[...base, ...items]} />;
};

export default HadithBreadcrumbs;
