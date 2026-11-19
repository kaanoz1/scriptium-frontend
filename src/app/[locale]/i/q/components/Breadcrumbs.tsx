"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import PageBreadcrumbs from "@/components/Page/PageBreadcrumbs";

const Breadcrumbs: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations("Terms.Islam");

  return (
    <PageBreadcrumbs
      items={[
        { label: t("this"), href: `/${locale}/i` },
        { label: t("Quran.this") },
      ]}
    />
  );
};

export default Breadcrumbs;
