"use client";

import React from "react";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useLocale, useTranslations } from "next-intl";
import { ChapterWithVerses } from "@/classes/Islam/Quran/Chapter/WithVerses";
import { QuranViewPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";
import { instrumentSerif } from "@/fonts";
import { cn } from "@/lib/utils";

type Props = {
  chapter: ChapterWithVerses;
};

const BISMILLAH = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

const Header: React.FC<Props> = observer(({ chapter }) => {
  const gt = useTranslations("Terms.Islam.Quran.Chapter");
  const vt = useTranslations("Pages.Islam.Quran.Components.ChapterCard");
  const locale = useLocale();

  const meaning = chapter.meanings.find(
    (m) => m.language.code === locale,
  )?.text;
  const selectedFont = QuranViewPreferences.getInstance().selectedArabicFont;

  const showBismillah = chapter.sequence !== 1 && chapter.sequence !== 9;

  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center gap-5 overflow-hidden rounded-3xl border border-border/60 bg-card/60 px-6 py-10 text-center backdrop-blur-sm md:py-14"
    >
      <span
        aria-hidden
        className={cn(
          instrumentSerif.className,
          "pointer-events-none absolute -left-4 -top-10 select-none text-[11rem] leading-none text-foreground/[0.04] md:text-[14rem]",
        )}
      >
        {chapter.sequence}
      </span>

      <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        <span className="h-px w-10 bg-linear-to-r from-amber-500 to-emerald-500" />
        {gt("this")} {chapter.sequence}
        <span className="h-px w-10 bg-linear-to-l from-amber-500 to-emerald-500" />
      </span>

      <h1
        dir="rtl"
        className={cn(
          "text-5xl leading-tight md:text-7xl",
          selectedFont.className,
        )}
      >
        {chapter.name}
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-muted-foreground">
        {meaning && (
          <span
            className={cn(
              instrumentSerif.className,
              "text-2xl text-foreground md:text-3xl",
            )}
          >
            {meaning}
          </span>
        )}
        <span className="rounded-full border border-border/60 bg-background/60 px-2.5 py-0.5 text-xs tabular-nums">
          {chapter.verses.length} {vt("Verses")}
        </span>
      </div>

      {showBismillah && (
        <p
          dir="rtl"
          className={cn(
            "mt-3 border-t border-border/50 pt-6 text-2xl text-foreground/80 md:text-3xl",
            selectedFont.className,
          )}
        >
          {BISMILLAH}
        </p>
      )}
    </motion.header>
  );
});

export default Header;
