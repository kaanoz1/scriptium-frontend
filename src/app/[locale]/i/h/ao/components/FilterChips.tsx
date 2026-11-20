"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import LoadingLink from "@/components/LoadingLink";
import { cn } from "@/lib/utils";
import { gradeInfo, GRADE_ORDER, HADITH_TYPES, TONE_BADGE, typeInfo } from "@/util/Islam/Hadith/Codes";

type Props = {
  /** Which codes to offer (defaults to every code). */
  gradeCodes?: number[];
  typeCodes?: number[];
  showTypes?: boolean;
  anchor?: string;
};

/** Grade / type filter chips that edit the URL (and reset paging). */
const FilterChips: React.FC<Props> = ({ gradeCodes, typeCodes, showTypes = true, anchor }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Pages.Islam.Hadith");

  const current = (key: string) => searchParams.get(key);
  const href = (key: string, value: number | null) => {
    const p = new URLSearchParams(searchParams.toString());
    p.delete("page");
    if (value === null || current(key) === String(value)) p.delete(key);
    else p.set(key, String(value));
    const qs = p.toString();
    return `${pathname}${qs ? `?${qs}` : ""}${anchor ? `#${anchor}` : ""}`;
  };

  const grades = (gradeCodes ?? GRADE_ORDER).filter((c) => GRADE_ORDER.includes(c));
  const types = typeCodes ?? Object.keys(HADITH_TYPES).map(Number);
  const chip = "rounded-full border px-3 py-1 text-xs transition-colors";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs text-muted-foreground">{t("Common.Grade")}:</span>
        <LoadingLink href={href("grade", null)} className={cn(chip, !current("grade") ? "border-foreground/30 bg-foreground text-background" : "border-border/60 hover:bg-muted")}>
          {t("Common.All")}
        </LoadingLink>
        {grades
          .sort((a, b) => GRADE_ORDER.indexOf(a) - GRADE_ORDER.indexOf(b))
          .map((g) => {
            const info = gradeInfo(g);
            const active = current("grade") === String(g);
            return (
              <LoadingLink key={g} href={href("grade", g)} className={cn(chip, active ? TONE_BADGE[info.tone] + " ring-1 ring-current" : "border-border/60 hover:bg-muted")}>
                {t(`Grades.${info.key}`)}
              </LoadingLink>
            );
          })}
      </div>
      {showTypes && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs text-muted-foreground">{t("Common.Type")}:</span>
          <LoadingLink href={href("type", null)} className={cn(chip, !current("type") ? "border-foreground/30 bg-foreground text-background" : "border-border/60 hover:bg-muted")}>
            {t("Common.All")}
          </LoadingLink>
          {types.map((c) => {
            const info = typeInfo(c);
            const active = current("type") === String(c);
            return (
              <LoadingLink key={c} href={href("type", c)} className={cn(chip, active ? TONE_BADGE[info.tone] + " ring-1 ring-current" : "border-border/60 hover:bg-muted")}>
                {t(`Types.${info.key}`)}
              </LoadingLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterChips;
