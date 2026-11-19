"use client";

import React from "react";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { BarChart2 } from "lucide-react";
import { RootUpToQuran } from "@/classes/Islam/Quran/Root/UpToQuran";
import { QuranViewPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";

type Props = {
  root: RootUpToQuran;
  actions?: React.ReactNode;
};

const Header: React.FC<Props> = observer(({ root, actions }) => {
  const t = useTranslations("Pages.Islam.Quran.Root.Components.Header");
  const it = useTranslations("Terms.Islam.Quran.Root");
  const occurrences = root.words.length;
  const arabicFont = QuranViewPreferences.getInstance().selectedArabicFont;

  const letters = [...root.text.replace(/\s/g, "")];

  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6 rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between md:p-8"
    >
      <div className="flex items-center gap-6">
        <div className="flex gap-1.5" dir="rtl">
          {letters.map((letter, i) => (
            <span
              key={i}
              className={`flex h-16 w-14 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-4xl md:h-20 md:w-16 md:text-5xl ${arabicFont.className}`}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {it("this")}
          </span>
          <h1 className="font-mono text-2xl tracking-wider md:text-3xl">
            {root.latin}
          </h1>
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <BarChart2
              size={14}
              className="text-emerald-600 dark:text-emerald-400"
            />
            <span className="font-semibold tabular-nums text-foreground">
              {occurrences}
            </span>
            {t("Occurrences")}
          </span>
        </div>
      </div>

      {actions && (
        <div className="flex shrink-0 justify-start md:justify-end">
          {actions}
        </div>
      )}
    </motion.header>
  );
});

export default Header;
