"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import PageBreadcrumbs from "@/components/Page/PageBreadcrumbs";

type Props = {
  /** When given, the root list becomes a link and this root is the current page. */
  current?: React.ReactNode;
};

const Breadcrumbs: React.FC<Props> = ({ current }) => {
  const locale = useLocale();
  const t = useTranslations("Terms.Islam");

  return (
    <PageBreadcrumbs
      items={[
        { label: t("this"), href: `/${locale}/i`, hideOnMobile: true },
        { label: t("Quran.this"), href: `/${locale}/i/q` },
        { label: t("Quran.Root.this"), href: current ? `/${locale}/i/q/root` : undefined },
        ...(current ? [{ label: current }] : []),
      ]}
    />
  );
};

export default Breadcrumbs;
