"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { LuScrollText } from "react-icons/lu";
import { THadithListItem, TPaged } from "@/dto/Islam/Hadith/ArabicOnly";
import HadithListRow from "@/app/[locale]/i/h/ao/components/HadithListRow";
import Pagination from "@/app/[locale]/i/h/ao/components/Pagination";

type Props = {
  page: TPaged<THadithListItem>;
  hideBook?: boolean;
  anchor?: string;
  emptyText?: string;
};

const HadithList: React.FC<Props> = ({ page, hideBook, anchor, emptyText }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith.Common");

  if (page.items.length === 0)
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/60 p-10 text-center text-muted-foreground">
        <LuScrollText size={28} />
        <p>{emptyText ?? t("NoResults")}</p>
      </div>
    );

  const from = (page.page - 1) * page.pageSize + 1;
  const to = from + page.items.length - 1;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground tabular-nums">
        {t("ShowingRange", {
          from: from.toLocaleString(locale),
          to: to.toLocaleString(locale),
          total: `${page.totalCount.toLocaleString(locale)}${page.totalIsLowerBound ? "+" : ""}`,
        })}
      </p>
      <div className="flex flex-col gap-3">
        {page.items.map((item) => (
          <HadithListRow key={item.id} item={item} hideBook={hideBook} />
        ))}
      </div>
      <Pagination page={page.page} pageSize={page.pageSize} totalCount={page.totalCount} anchor={anchor} className="pt-2" />
    </div>
  );
};

export default HadithList;
