"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import LoadingLink from "@/components/LoadingLink";
import { cn } from "@/lib/utils";

type Props = {
  page: number;
  pageSize: number;
  totalCount: number;
  /** Query parameter that holds the page number. */
  param?: string;
  /** Element id to scroll to after navigation. */
  anchor?: string;
  className?: string;
};

/** Link-based pagination that keeps every other query parameter. */
const Pagination: React.FC<Props> = ({ page, pageSize, totalCount, param = "page", anchor, className }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith.Common");

  const pages = Math.max(1, Math.ceil(totalCount / pageSize));
  if (pages <= 1) return null;

  const href = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (p <= 1) params.delete(param);
    else params.set(param, String(p));
    const qs = params.toString();
    return `${pathname}${qs ? `?${qs}` : ""}${anchor ? `#${anchor}` : ""}`;
  };

  // 1 … p-1 p p+1 … last
  const around = new Set<number>([1, pages, page - 1, page, page + 1]);
  const shown = [...around].filter((p) => p >= 1 && p <= pages).sort((a, b) => a - b);

  const item = "flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm tabular-nums transition-colors";

  return (
    <nav aria-label={t("Pagination")} className={cn("flex flex-wrap items-center justify-center gap-1.5", className)}>
      {page > 1 ? (
        <LoadingLink href={href(page - 1)} className={cn(item, "border-border/60 hover:bg-muted")} aria-label={t("Previous")}>
          <LuChevronLeft />
        </LoadingLink>
      ) : (
        <span className={cn(item, "border-border/30 text-muted-foreground/40")}>
          <LuChevronLeft />
        </span>
      )}

      {shown.map((p, i) => (
        <React.Fragment key={p}>
          {i > 0 && p - shown[i - 1] > 1 && <span className="px-1 text-muted-foreground">…</span>}
          {p === page ? (
            <span aria-current="page" className={cn(item, "border-foreground/20 bg-foreground text-background")}>
              {p.toLocaleString(locale)}
            </span>
          ) : (
            <LoadingLink href={href(p)} className={cn(item, "border-border/60 hover:bg-muted")}>
              {p.toLocaleString(locale)}
            </LoadingLink>
          )}
        </React.Fragment>
      ))}

      {page < pages ? (
        <LoadingLink href={href(page + 1)} className={cn(item, "border-border/60 hover:bg-muted")} aria-label={t("Next")}>
          <LuChevronRight />
        </LoadingLink>
      ) : (
        <span className={cn(item, "border-border/30 text-muted-foreground/40")}>
          <LuChevronRight />
        </span>
      )}
    </nav>
  );
};

export default Pagination;
