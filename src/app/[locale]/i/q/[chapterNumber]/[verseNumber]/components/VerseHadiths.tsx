"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LuScrollText } from "react-icons/lu";
import LoadingLink from "@/components/LoadingLink";
import { THadithListItem, TPaged } from "@/dto/Islam/Hadith/ArabicOnly";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import HadithListRow from "@/app/[locale]/i/h/ao/components/HadithListRow";
import { HadithViewPreferences } from "@/configuration/UserPreferences/Islam/Hadith/HadithViewPreferences";

const PREVIEW = 3;

/**
 * "Hadiths citing this verse": loaded on the client so the verse page itself
 * never waits for (or fails because of) the hadith corpus.
 */
const VerseHadiths: React.FC<{ chapter: number; verse: number }> = ({ chapter, verse }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith.Quran");
  const [data, setData] = useState<TPaged<THadithListItem> | null>(null);

  // The verse page is not a hadith page: load the saved reading settings here.
  useEffect(() => HadithViewPreferences.getInstance().hydrate(), []);

  useEffect(() => {
    let alive = true;
    BackendApi.HadithArabicOnlyController.quranVerseHadiths(chapter, verse, 1, PREVIEW).then((res) => {
      if (alive && res.ok) setData(res.data);
    });
    return () => {
      alive = false;
    };
  }, [chapter, verse]);

  if (!data || data.totalCount === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight md:text-2xl">
          <LuScrollText className="text-amber-600 dark:text-amber-400" />
          {t("CitingThisVerse", { count: data.totalCount.toLocaleString(locale) })}
        </h2>
        {data.totalCount > PREVIEW && (
          <LoadingLink href={`/${locale}/i/h/ao/quran/${chapter}/${verse}`} className="text-sm text-muted-foreground hover:text-foreground">
            {t("SeeAll")} →
          </LoadingLink>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {data.items.map((item) => (
          <HadithListRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default VerseHadiths;
