"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { LuInfo } from "react-icons/lu";

/** Provenance and grading disclaimer shown on the corpus pages. */
const SourceNote: React.FC = () => {
  const t = useTranslations("Pages.Islam.Hadith.Common");
  return (
    <aside className="flex gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
      <LuInfo className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" size={18} />
      <p>{t("SourceNote")}</p>
    </aside>
  );
};

export default SourceNote;
