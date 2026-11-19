"use client";

import React from "react";
import { useTranslations } from "next-intl";
import PageHeader from "@/components/Page/PageHeader";

const WhatIsScriptiumSection: React.FC = () => {
  const t = useTranslations("Pages.About.WhatIsScriptium");

  return (
    <section className="py-8 md:py-14">
      <PageHeader
        align="center"
        eyebrow={t("Badge")}
        title={t("Title")}
        description={t("Description")}
      />
    </section>
  );
};

export default WhatIsScriptiumSection;
