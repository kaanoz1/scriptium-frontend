"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import LoadingLink from "@/components/LoadingLink";
import { TCodeCount } from "@/dto/Islam/Hadith/ArabicOnly";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { gradeInfo, GRADE_ORDER, rankInfo, Tone, TONE_FILL, typeInfo } from "@/util/Islam/Hadith/Codes";

type Kind = "grade" | "type" | "rank";

type Props = {
  items: TCodeCount[];
  kind: Kind;
  /** When set, legend entries link to `hrefFor(code)` (e.g. a filtered list). */
  hrefFor?: (code: number) => string;
  className?: string;
};

/** Stacked percentage bar with a legend. */
const Distribution: React.FC<Props> = ({ items, kind, hrefFor, className }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith");
  const total = items.reduce((a, b) => a + b.count, 0);
  if (total === 0) return null;

  const meta = (code: number): { label: string; tone: Tone } => {
    if (kind === "grade") {
      const i = gradeInfo(code);
      return { label: t(`Grades.${i.key}`), tone: i.tone };
    }
    if (kind === "type") {
      const i = typeInfo(code);
      return { label: t(`Types.${i.key}`), tone: i.tone };
    }
    const i = rankInfo(code);
    return { label: t(`Ranks.${i.key}`), tone: i.tone };
  };

  const ordered =
    kind === "grade"
      ? [...items].sort((a, b) => GRADE_ORDER.indexOf(a.code) - GRADE_ORDER.indexOf(b.code))
      : [...items].sort((a, b) => a.code - b.code);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
        {ordered.map((i) => {
          const m = meta(i.code);
          const pct = (i.count / total) * 100;
          return (
            <Tooltip key={i.code}>
              <TooltipTrigger asChild>
                <div className={cn("h-full", TONE_FILL[m.tone])} style={{ width: `${pct}%` }} />
              </TooltipTrigger>
              <TooltipContent>
                {m.label}: {i.count.toLocaleString(locale)} ({pct.toFixed(1)}%)
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
        {ordered.map((i) => {
          const m = meta(i.code);
          const content = (
            <>
              <span className={cn("h-2 w-2 rounded-full", TONE_FILL[m.tone])} />
              <span>{m.label}</span>
              <span className="tabular-nums text-muted-foreground">{i.count.toLocaleString(locale)}</span>
            </>
          );
          return (
            <li key={i.code}>
              {hrefFor ? (
                <LoadingLink href={hrefFor(i.code)} className="flex items-center gap-1.5 hover:underline">
                  {content}
                </LoadingLink>
              ) : (
                <span className="flex items-center gap-1.5">{content}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Distribution;
