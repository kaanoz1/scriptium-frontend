"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { LuArrowUpRight } from "react-icons/lu";
import LoadingLink from "@/components/LoadingLink";
import { THadithListItem } from "@/dto/Islam/Hadith/ArabicOnly";
import { GradeBadge, TypeBadge } from "@/app/[locale]/i/h/ao/components/Badges";
import HighlightedText from "@/app/[locale]/i/h/ao/components/HighlightedText";
import ReadingText from "@/app/[locale]/i/h/ao/components/ReadingText";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { cn } from "@/lib/utils";

type Props = {
  item: THadithListItem;
  /** Hide the book name (e.g. on the book's own page). */
  hideBook?: boolean;
};

/** One hadith in a list: book & number, grade, and the matn. */
const HadithListRow: React.FC<Props> = ({ item, hideBook }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith.Common");
  const href = `/${locale}/i/h/ao/${item.book.id}/${item.number}`;

  return (
    <LoadingLink
      href={href}
      className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm transition-colors hover:border-border hover:bg-card md:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="rounded-lg border border-border/60 bg-background/70 px-2 py-0.5 font-mono text-xs tabular-nums text-muted-foreground">
            #{item.number.toLocaleString(locale)}
          </span>
          {!hideBook && (
            <span dir="rtl" className={cn(Amiri.className, "truncate text-base")}>
              {item.book.name}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <TypeBadge type={item.type} />
          <GradeBadge grade={item.grade} />
          <LuArrowUpRight className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
      <ReadingText scale={0.8} minSize={16} className="text-pretty leading-loose text-foreground/90">
        <HighlightedText text={item.matn} ranges={item.highlights} />
        {item.matnTruncated && <span className="text-muted-foreground"> …</span>}
      </ReadingText>
      {item.matnTruncated && (
        <span className="text-xs text-muted-foreground">{t("ReadFull")}</span>
      )}
    </LoadingLink>
  );
};

export default HadithListRow;
