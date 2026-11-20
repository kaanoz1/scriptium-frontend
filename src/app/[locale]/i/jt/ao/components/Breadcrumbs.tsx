"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import PageBreadcrumbs, { Crumb } from "@/components/Page/PageBreadcrumbs";

type Props = {
  /** Crumbs after "Islam › Jarh wa Ta'dil › Arabic corpus". */
  items?: Crumb[];
};

const JarhTadilBreadcrumbs: React.FC<Props> = ({ items = [] }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.JarhTadil");
  const it = useTranslations("Terms.Islam");

  const base: Crumb[] = [
    { label: it("this"), href: `/${locale}/i` },
    { label: t("Index.Title"), href: `/${locale}/i/jt` },
    { label: t("Common.CorpusShort"), href: `/${locale}/i/jt/ao` },
  ];

  return <PageBreadcrumbs items={[...base, ...items]} />;
};

export default JarhTadilBreadcrumbs;
