"use client";

import React from "react";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useLocale, useTranslations } from "next-intl";
import { VerseBoth } from "@/classes/Islam/Quran/Verse/Both";
import Breadcrumbs from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/Breadcrumbs";
import VerseTranslation from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/VerseTranslation";
import VerseTransliteration from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/VerseTransliteration";
import VerseTable from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/VerseTable";
import UtilToolButtons from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/UtilToolButtons";
import VerseText from "@/app/[locale]/i/q/[chapterNumber]/components/VerseText";
import { QuranViewPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";
import PageShell from "@/components/Page/PageShell";
import LoadingLink from "@/components/LoadingLink";
import { instrumentSerif } from "@/fonts";
import { cn } from "@/lib/utils";

type Props = {
  verse: VerseBoth;
};

const Main: React.FC<Props> = observer(({ verse }) => {
  const locale = useLocale();
  const t = useTranslations("Terms.Islam.Quran");
  const preferences = QuranViewPreferences.getInstance();
  const chapter = verse.chapter;
  const meaning = chapter.meanings.find(
    (m) => m.language.code === locale,
  )?.text;

  return (
    <PageShell size="xl" className="gap-8">
      <div className="sticky top-22 z-20 flex flex-col gap-2 rounded-2xl border border-border/60 bg-background/80 p-1.5 shadow-lg shadow-black/[0.03] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumbs verse={verse} />
        <div className="flex shrink-0 justify-center sm:justify-end">
          <UtilToolButtons verse={verse} />
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 backdrop-blur-sm"
      >
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 px-6 py-4 md:px-10">
          <LoadingLink
            href={`/${locale}/i/q/${chapter.sequence}#verse-${verse.sequence}`}
            className="group flex items-baseline gap-3"
          >
            <span
              className={cn(instrumentSerif.className, "text-3xl md:text-4xl")}
            >
              {meaning ?? chapter.name}
            </span>
            {/* <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
              {t("Verse.this")} {verse.sequence}
            </span> TODO: This section might be removed. Consider. */}
          </LoadingLink>
          <span className="rounded-full border border-border/60 bg-background/60 px-3 py-1 font-mono text-xs tabular-nums text-muted-foreground">
            {chapter.sequence}:{verse.sequence}
          </span>
        </header>

        <div
          className={cn(
            "grid gap-10 px-6 py-10 md:px-10 md:py-14",
            preferences.shouldTranslationShown &&
              preferences.shouldVerseTextShown &&
              "lg:grid-cols-2 lg:gap-16",
          )}
        >
          {preferences.shouldVerseTextShown && (
            <div className="lg:order-2">
              <VerseText verse={verse} />
            </div>
          )}
          {preferences.shouldTranslationShown && (
            <div className="lg:order-1 lg:border-r lg:border-dashed lg:border-border/60 lg:pr-16">
              <VerseTranslation verse={verse} />
            </div>
          )}
        </div>

        <div className="px-6 pb-8 md:px-10">
          <VerseTransliteration verse={verse} />
        </div>
      </motion.section>

      <VerseTable verse={verse} />
    </PageShell>
  );
});

export default Main;
