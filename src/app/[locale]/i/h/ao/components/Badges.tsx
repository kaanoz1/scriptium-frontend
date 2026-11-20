"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Amiri } from "@/fonts/Arabic/Amiri";
import {
  gradeInfo,
  rankInfo,
  Tone,
  TONE_BADGE,
  typeInfo,
} from "@/util/Islam/Hadith/Codes";

type BaseProps = {
  tone: Tone;
  arabic: string;
  label: string;
  tooltip?: string;
  size?: "sm" | "md";
  className?: string;
};

const CodeBadge: React.FC<BaseProps> = ({ tone, arabic, label, tooltip, size = "sm", className }) => {
  const badge = (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border font-medium",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs",
        TONE_BADGE[tone],
        className,
      )}
    >
      <span>{label}</span>
      <span className={cn(Amiri.className, "text-[1.15em] leading-none opacity-80")} dir="rtl">
        {arabic}
      </span>
    </span>
  );
  if (!tooltip) return badge;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{badge}</TooltipTrigger>
      <TooltipContent className="max-w-xs text-center">{tooltip}</TooltipContent>
    </Tooltip>
  );
};

export const GradeBadge: React.FC<{ grade: number; size?: "sm" | "md"; className?: string }> = ({
  grade,
  size,
  className,
}) => {
  const t = useTranslations("Pages.Islam.Hadith");
  const info = gradeInfo(grade);
  return (
    <CodeBadge
      tone={info.tone}
      arabic={info.arabic}
      label={t(`Grades.${info.key}`)}
      tooltip={t("Common.GradeTooltip")}
      size={size}
      className={className}
    />
  );
};

export const TypeBadge: React.FC<{ type: number; size?: "sm" | "md"; className?: string }> = ({
  type,
  size,
  className,
}) => {
  const t = useTranslations("Pages.Islam.Hadith");
  const info = typeInfo(type);
  return (
    <CodeBadge
      tone={info.tone}
      arabic={info.arabic}
      label={t(`Types.${info.key}`)}
      tooltip={t(`TypeDescriptions.${info.key}`)}
      size={size}
      className={className}
    />
  );
};

export const RankBadge: React.FC<{
  rankNo: number;
  rank?: string | null;
  size?: "sm" | "md";
  className?: string;
}> = ({ rankNo, rank, size, className }) => {
  const t = useTranslations("Pages.Islam.Hadith");
  const info = rankInfo(rankNo);
  return (
    <CodeBadge
      tone={info.tone}
      arabic={rank || info.arabic}
      label={t(`Ranks.${info.key}`)}
      tooltip={t("Common.RankTooltip")}
      size={size}
      className={className}
    />
  );
};

/** A small coloured dot for a narrator's rank. */
export const RankDot: React.FC<{ rankNo: number; className?: string }> = ({ rankNo, className }) => {
  const info = rankInfo(rankNo);
  return (
    <span
      aria-hidden
      className={cn("inline-block h-2 w-2 shrink-0 rounded-full border", TONE_BADGE[info.tone], className)}
      style={{ backgroundColor: "currentColor" }}
    />
  );
};
