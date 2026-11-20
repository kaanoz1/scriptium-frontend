"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import LoadingLink from "@/components/LoadingLink";
import { TNarratorPlain } from "@/dto/Islam/Hadith/ArabicOnly";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { cn } from "@/lib/utils";
import { hijri, rankInfo, TONE_BADGE } from "@/util/Islam/Hadith/Codes";

type Props = {
  narrator: TNarratorPlain;
  /** Extra number shown at the end (e.g. shared chains). */
  count?: number;
  className?: string;
};

/** Compact narrator chip: rank colour, kunya, death year. */
const NarratorLink: React.FC<Props> = ({ narrator, count, className }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith");
  const info = rankInfo(narrator.rankNo);
  const died = hijri(narrator.deathYear, t("Common.AH"));

  return (
    <LoadingLink
      href={`/${locale}/i/jt/ao/narrator/${narrator.id}`}
      className={cn(
        "group inline-flex max-w-full items-center gap-2 rounded-xl border bg-background/60 px-3 py-1.5 transition-colors hover:bg-muted",
        TONE_BADGE[info.tone],
        className,
      )}
      title={narrator.name}
    >
      <span dir="rtl" className={cn(Amiri.className, "truncate text-base text-foreground")}>
        {narrator.nickname || narrator.name}
      </span>
      {died && <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">{died}</span>}
      {count !== undefined && (
        <span className="shrink-0 rounded-full bg-foreground/5 px-1.5 text-[11px] tabular-nums text-muted-foreground">
          {count.toLocaleString(locale)}
        </span>
      )}
    </LoadingLink>
  );
};

export default NarratorLink;
