"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { IoBookOutline } from "react-icons/io5";
import { QuranTranslationPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranTranslationPreferences";

const TranslationIndicator: React.FC = observer(() => {
  const t = useTranslations(
    "Pages.Islam.Quran.Chapter.Components.TranslationIndicator",
  );
  const preferences =
    QuranTranslationPreferences.getInstance().preferredTranslations;
  const length = preferences.length;

  let text;

  if (length === 1) {
    const authorsConcatenated = preferences[0].authors
      .map((a) => a.name)
      .filter((name) => name != preferences[0].name)
      .join(", ");

    text =
      authorsConcatenated.length > 0
        ? `${preferences[0].name} (${authorsConcatenated})`
        : preferences[0].name;
  } else {
    text = `${length} ${t("Translations")}`;
  }

  return (
    <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-muted/60 px-3 py-1.5 text-sm font-medium sm:inline-flex sm:w-auto sm:justify-start">
      <IoBookOutline size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
      <span className="truncate max-w-none sm:max-w-75 text-center sm:text-left">
        {text}
      </span>
    </div>
  );
});

export default TranslationIndicator;
