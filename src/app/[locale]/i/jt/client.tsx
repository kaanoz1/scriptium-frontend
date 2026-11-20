"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Languages, UserCheck } from "lucide-react";
import TraditionIndex, { TraditionSection } from "@/app/[locale]/components/TraditionIndex";
import { Amiri } from "@/fonts/Arabic/Amiri";

/**
 * Jarh wa ta'dil works. Each corpus lives under its own segment so that
 * translated works can be added next to the Arabic-only one later.
 */
const SECTIONS: TraditionSection[] = [
  {
    key: "ArabicOnly",
    icon: <UserCheck size={24} />,
    accent: "239 68 68",
    path: "ao",
    watermark: "الرجال",
  },
  { key: "Translated", icon: <Languages size={20} />, accent: "59 130 246" },
];

const Client: React.FC = () => {
  const locale = useLocale();
  const it = useTranslations("Terms.Islam");
  return (
    <TraditionIndex
      parentCrumbs={[{ label: it("this"), href: `/${locale}/i` }]}
      namespace="Pages.Islam.JarhTadil.Index"
      basePath="i/jt"
      native="الجرح والتعديل"
      nativeClassName={Amiri.className}
      watermarkClassName={Amiri.className}
      sections={SECTIONS}
    />
  );
};

export default Client;
