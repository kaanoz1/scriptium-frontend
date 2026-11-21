"use client";

import React from "react";
import {
  BookOpen,
  Brain,
  Languages,
  Layers,
  MessageSquareQuote,
  NotebookPen,
  Scale,
  ScrollText,
  Sparkles,
} from "lucide-react";
import TraditionIndex, {
  TraditionSection,
} from "@/app/[locale]/components/TraditionIndex";
import { useTranslations } from "next-intl";
import UnknownError from "@/util/components/Error/UnknownError";

const sectionKeys: Array<string> = [
  "Tanakh",
  "Mishnah",
  "Talmud",
  "Midrash",
  "Targum",
  "Halakha",
  "Responsa",
  "Philosophy",
  "Kabbalah",
];

const SECTIONS: TraditionSection[] = [
  {
    key: "Tanakh",
    icon: <BookOpen size={24} />,
    accent: "245 158 11",
    watermark: "תורה",
  },
  { key: "Mishnah", icon: <ScrollText size={20} />, accent: "20 184 166" },
  { key: "Talmud", icon: <Layers size={20} />, accent: "59 130 246" },
  { key: "Midrash", icon: <NotebookPen size={20} />, accent: "168 85 247" },
  { key: "Targum", icon: <Languages size={20} />, accent: "16 185 129" },
  { key: "Halakha", icon: <Scale size={20} />, accent: "239 68 68" },
  {
    key: "Responsa",
    icon: <MessageSquareQuote size={20} />,
    accent: "234 88 12",
  },
  { key: "Philosophy", icon: <Brain size={20} />, accent: "99 102 241" },
  { key: "Kabbalah", icon: <Sparkles size={20} />, accent: "236 72 153" },
];

const Client: React.FC = () => {
  const t = useTranslations("Pages.Judaism.Index");

  if (SECTIONS.length !== sectionKeys.length)
    return (
      <UnknownError title="Something went wrong. Our team gonna investigate this issue soon." />
    );

  for (let i = 0; i < sectionKeys.length; i++) {
    const translatedKey: string = t(sectionKeys[i]);

    SECTIONS[i].key = translatedKey;
  }

  return (
    <TraditionIndex
      namespace="Pages.Judaism.Index"
      basePath="j"
      native="יהדות"
      sections={SECTIONS}
    />
  );
};

export default Client;
