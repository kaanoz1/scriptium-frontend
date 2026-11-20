"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { LuArrowDown } from "react-icons/lu";
import LoadingLink from "@/components/LoadingLink";
import { TNarratorPlain, TSanadComplete } from "@/dto/Islam/Hadith/ArabicOnly";
import { GradeBadge, RankBadge } from "@/app/[locale]/i/h/ao/components/Badges";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { cn } from "@/lib/utils";
import { hijri, rankInfo, TONE_STROKE } from "@/util/Islam/Hadith/Codes";

type Props = {
  sanad: TSanadComplete;
  index: number;
  narrator: (id: number) => TNarratorPlain | undefined;
};

/**
 * One chain, drawn top-down from the companion to the book's author, the
 * order in which the report travelled.
 */
const SanadChain: React.FC<Props> = ({ sanad, index, narrator }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith");
  const links = [...sanad.narrators].sort((a, b) => b.position - a.position);
  const weakest = sanad.maxRank;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/60 p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold">
          {t("Hadith.ChainN", { n: index + 1 })}
          <span className="ml-2 font-normal text-muted-foreground">
            {t("Hadith.ChainLength", { n: sanad.length ?? links.length })}
          </span>
        </span>
        <GradeBadge grade={sanad.grade} />
      </div>
      <p dir="rtl" className={cn(Amiri.className, "text-lg text-muted-foreground")}>
        {sanad.verdict}
      </p>
      <ol className="flex flex-col items-stretch">
        {links.map((l, i) => {
          const n = narrator(l.narratorId);
          const isWeakest = n && weakest !== null && n.rankNo === weakest && weakest >= 7;
          const info = rankInfo(n?.rankNo ?? 0);
          return (
            <li key={l.position} className="flex flex-col items-center">
              {i > 0 && <LuArrowDown className="my-0.5 text-muted-foreground/50" size={14} />}
              {n ? (
                <LoadingLink
                  href={`/${locale}/i/jt/ao/narrator/${n.id}`}
                  className={cn(
                    "flex w-full flex-wrap items-center justify-between gap-2 rounded-xl border bg-background/60 px-3 py-2 transition-colors hover:bg-muted",
                    isWeakest ? "border-rose-500/50 ring-1 ring-rose-500/30" : "border-border/60",
                  )}
                  style={{ borderInlineStartWidth: 4, borderInlineStartColor: TONE_STROKE[info.tone] }}
                  title={n.rank ? `${n.name} — ${n.rank}` : n.name}
                >
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    {l.position === 0 ? t("Hadith.Author") : i === 0 ? t("Hadith.Origin") : null}
                    {hijri(n.deathYear, t("Common.AH")) && (
                      <span className="tabular-nums">{t("Common.DiedIn", { year: hijri(n.deathYear, t("Common.AH"))! })}</span>
                    )}
                  </span>
                  <span className="flex items-center gap-2">
                    {/* Short label only: the full verbal grade can be very long; it is in the link title. */}
                    <RankBadge rankNo={n.rankNo} />
                    <span dir="rtl" className={cn(Amiri.className, "text-lg")}>
                      {n.nickname || n.name}
                    </span>
                  </span>
                </LoadingLink>
              ) : (
                <span className="w-full rounded-xl border border-dashed border-border/60 px-3 py-2 text-center text-sm text-muted-foreground">
                  {t("Hadith.UnknownNarrator")}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default SanadChain;
