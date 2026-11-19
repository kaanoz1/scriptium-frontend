"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { observer } from "mobx-react-lite";
import { ChapterWithVerseCount } from "@/classes/Islam/Quran/Chapter/WithVerseCount";
import { QuranViewPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";
import LoadingLink from "@/components/LoadingLink";

type Props = {
  chapter: ChapterWithVerseCount;
};

const ChapterCard: React.FC<Props> = observer(({ chapter }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Quran.Components.ChapterCard");
  const selectedFont = QuranViewPreferences.getInstance().selectedArabicFont;

  const meaningText =
    chapter.meanings.find((meaning) => meaning.language.code === locale)
      ?.text ?? "";

  return (
    <motion.div variants={itemVariants} className="h-full">
      <LoadingLink
        href={`/${locale}/i/q/${chapter.sequence}`}
        className="group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
          <span className="absolute inset-1.5 rounded-md border border-border transition-colors group-hover:border-emerald-500/50" />
          <span className="absolute inset-1.5 rotate-45 rounded-md border border-border transition-colors group-hover:border-emerald-500/50" />
          <span className="relative text-sm font-semibold tabular-nums transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
            {chapter.sequence}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold tracking-tight">
            {meaningText}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            <span className="tabular-nums">{chapter.verseCount}</span>{" "}
            {t("Verses")}
          </p>
        </div>

        <span
          dir="rtl"
          className={`shrink-0 text-2xl leading-none text-foreground/90 transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-300 ${selectedFont.className}`}
        >
          {chapter.name}
        </span>
      </LoadingLink>
    </motion.div>
  );
});

export default ChapterCard;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 26 },
  },
};
