"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { useLocale, useTranslations } from "next-intl";
import LoadingLink from "@/components/LoadingLink";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HadithComplete, HadithSegment } from "@/classes/Islam/Hadith/ArabicOnly/HadithComplete";
import { HadithViewPreferences } from "@/configuration/UserPreferences/Islam/Hadith/HadithViewPreferences";
import { hijri, rankInfo, TONE_STROKE } from "@/util/Islam/Hadith/Codes";
import { cn } from "@/lib/utils";

type Props = { hadith: HadithComplete };

/**
 * The full narration with annotations: the isnad is dimmed (or hidden), the
 * matn emphasised, narrator names link to their pages and Qur'an quotations
 * link to the verse.
 */
const HadithText: React.FC<Props> = observer(({ hadith }) => {
  const prefs = HadithViewPreferences.getInstance();
  const segments = hadith.segments();
  const visible = prefs.showIsnad || !hadith.hasMatnSpan ? segments : segments.filter((s) => s.inMatn);

  return (
    <p
      dir="rtl"
      lang="ar"
      className={cn(prefs.font.className, "text-pretty leading-[2.1] tracking-normal")}
      style={{ fontSize: prefs.fontSize }}
    >
      {visible.map((s) => (
        <Segment key={s.start} segment={s} />
      ))}
    </p>
  );
});

const Segment: React.FC<{ segment: HadithSegment }> = observer(({ segment: s }) => {
  const prefs = HadithViewPreferences.getInstance();
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith");
  const tone = s.inMatn ? "text-foreground" : "text-muted-foreground";

  if (s.quote && prefs.highlightQuran) {
    const { chapter, verseStart, verseEnd } = s.quote;
    const inner = (
      <span className="rounded-md bg-emerald-500/10 px-0.5 text-emerald-800 decoration-emerald-500/40 underline-offset-8 dark:text-emerald-200">
        {s.text}
      </span>
    );
    if (chapter && verseStart)
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <LoadingLink href={`/${locale}/i/q/${chapter}/${verseStart}`} className="hover:underline">
              {inner}
            </LoadingLink>
          </TooltipTrigger>
          <TooltipContent>
            {t("Hadith.QuranQuote", {
              ref: verseEnd && verseEnd !== verseStart ? `${chapter}:${verseStart}–${verseEnd}` : `${chapter}:${verseStart}`,
            })}
          </TooltipContent>
        </Tooltip>
      );
    return inner;
  }

  if (s.narrator && prefs.highlightNarrators) {
    const n = s.narrator;
    const info = rankInfo(n.rankNo);
    const died = hijri(n.deathYear, t("Common.AH"));
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <LoadingLink
            href={`/${locale}/i/jt/ao/narrator/${n.id}`}
            className={cn(tone, "underline decoration-2 underline-offset-[0.45em] transition-colors hover:text-foreground")}
            style={{ textDecorationColor: `${TONE_STROKE[info.tone]}99` }}
          >
            {s.text}
          </LoadingLink>
        </TooltipTrigger>
        <TooltipContent className="flex max-w-sm flex-col items-end gap-1 text-right">
          <span dir="rtl" className="text-sm font-semibold">
            {n.name}
          </span>
          <span className="text-xs opacity-80">
            {t(`Ranks.${info.key}`)}
            {n.rank ? ` · ${n.rank}` : ""}
            {died ? ` · ${t("Common.DiedIn", { year: died })}` : ""}
          </span>
        </TooltipContent>
      </Tooltip>
    );
  }

  return <span className={tone}>{s.text}</span>;
});

export default HadithText;
