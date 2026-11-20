"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Languages, ScrollText } from "lucide-react";
import TraditionIndex, { TraditionSection } from "@/app/[locale]/components/TraditionIndex";
import { Amiri } from "@/fonts/Arabic/Amiri";

/**
 * Hadith collections. Each corpus lives under its own segment so that
 * translated editions can be added next to the Arabic-only one later.
 */
const SECTIONS: TraditionSection[] = [
  {
    key: "ArabicOnly",
    icon: <ScrollText size={24} />,
    accent: "245 158 11",
    path: "ao",
    watermark: "الحديث",
  },
  { key: "Translated", icon: <Languages size={20} />, accent: "59 130 246" },
];

const Client: React.FC = () => {
  const locale = useLocale();
  const it = useTranslations("Terms.Islam");
  return (
  <TraditionIndex
    parentCrumbs={[{ label: it("this"), href: `/${locale}/i` }]}
    namespace="Pages.Islam.Hadith.Index"
    basePath="i/h"
    native="الحديث النبوي"
    nativeClassName={Amiri.className}
    watermarkClassName={Amiri.className}
    sections={SECTIONS}
  />
  );
};

export default Client;
