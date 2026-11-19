"use client";

import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2 } from "lucide-react";
import { RootWithWordCount } from "@/classes/Islam/Quran/Root/WithWordCount";
import { QuranViewPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";
import LoadingLink from "@/components/LoadingLink";

type Props = {
  filterQuery: string;
  roots: RootWithWordCount[];
};

const RootContainer: React.FC<Props> = observer(({ filterQuery, roots }) => {
  const locale = useLocale();
  const nt = useTranslations("Navbar.QuickNavigation.MobileSearchModal");
  const arabicFont = QuranViewPreferences.getInstance().selectedArabicFont;

  const processedRoots = useMemo(() => {
    const query = filterQuery.toLowerCase().trim();

    const result = query
      ? roots.filter(
          (r) =>
            r.latin.toLowerCase().includes(query) || r.text.includes(query),
        )
      : [...roots];

    return result;
  }, [filterQuery, roots]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.005 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      <AnimatePresence>
        {processedRoots.map((r) => (
          <motion.div key={r.latin} variants={item} layout>
            <LoadingLink
              href={`/${locale}/i/q/root/${r.latin}`}
              className="group relative flex h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-border/60 bg-card/70 px-4 pb-5 pt-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5"
            >
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 text-[10px] font-medium tabular-nums text-muted-foreground">
                <BarChart2 size={11} />
                {r.occurrences}
              </span>
              <span
                className={`text-4xl text-foreground transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-300 ${arabicFont.className}`}
                dir="rtl"
              >
                {r.text}
              </span>
              <span className="font-mono text-xs tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">
                {r.latin}
              </span>
            </LoadingLink>
          </motion.div>
        ))}
      </AnimatePresence>

      {processedRoots.length === 0 && (
        <div className="col-span-full py-20 text-center text-muted-foreground">
          {nt("NoResultsFound")}
        </div>
      )}
    </motion.div>
  );
});

export default RootContainer;
