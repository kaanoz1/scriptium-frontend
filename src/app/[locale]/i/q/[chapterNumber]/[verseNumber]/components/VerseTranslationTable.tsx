"use client";

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VerseTranslationComplete } from "@/classes/Islam/Quran/VerseTranslation/Complete";
import { QuranTranslationPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranTranslationPreferences";

type Props = {
  translationOfVerse: Array<VerseTranslationComplete>;
};

const VerseTranslationTable: React.FC<Props> = observer(
  ({ translationOfVerse }) => {
    const t = useTranslations(
      "Pages.Islam.Quran.Chapter.Verse.Components.VerseTranslationTable",
    );
    const preferences = QuranTranslationPreferences.getInstance();

    const [isSticky, setIsSticky] = useState(true);

    const allTranslations = preferences.allTranslations;
    const preferredTranslations = preferences.preferredTranslations;

    const preferredIds = preferredTranslations.map((pref) => pref.id);

    const sortedTranslations = [...allTranslations].sort((a, b) => {
      const indexA = preferredIds.indexOf(a.id);
      const indexB = preferredIds.indexOf(b.id);

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });

    const translationsShown = sortedTranslations.map((trans) => {
      const found = translationOfVerse.find(
        (tv) => tv.translation.id === trans.id,
      );
      return {
        meta: trans,
        content: found,
        isPreferred: preferredIds.includes(trans.id),
      };
    });

    if (translationsShown.length === 0) {
      return (
        <div className="flex h-32 items-center justify-center rounded-xl border border-dashed bg-muted/30 text-sm text-muted-foreground">
          {t("NoActiveTranslationsSelected") || "No translations available."}
        </div>
      );
    }

    return (
      <div
        className={`group rounded-2xl border border-border/60 bg-card/70 text-card-foreground backdrop-blur-sm flex flex-col transition-all duration-300 ${
          isSticky
            ? "xl:sticky xl:top-44 xl:max-h-[calc(100vh-12rem)] overflow-hidden"
            : ""
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border/60 bg-muted/30 px-5 py-3.5 text-sm font-medium text-muted-foreground z-20 relative">
          <div className="flex items-center gap-2">
            <Languages size={16} className="text-emerald-600 dark:text-emerald-400" />
            <span>
              {translationsShown.length} {t("Translations") || "Translations"}
            </span>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Switch
                    checked={isSticky}
                    onCheckedChange={setIsSticky}
                    aria-label="Toggle sticky mode"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[200px] text-center">
                <p>
                  {t("StickyToggleInfo") ||
                    "Toggle to pin this table to the screen and scroll its contents independently."}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div
          className={`flex flex-col divide-y ${isSticky ? "overflow-y-auto" : ""}`}
        >
          {translationsShown.map(({ meta, content, isPreferred }) => {
            const authorsNamedConcatenated = meta.authors
              .map((a) => a.name)
              .filter((a) => a != meta.name)
              .join(", ");

            return (
              <div
                key={meta.id}
                className={`p-5 transition-colors hover:bg-muted/50 ${isPreferred ? "" : "opacity-80 bg-muted/10"}`}
              >
                <header className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      isPreferred
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {meta.name}
                  </span>
                  <span className="text-xs font-medium italic text-muted-foreground">
                    {authorsNamedConcatenated}
                  </span>
                </header>

                <main className="text-base leading-relaxed text-foreground/90">
                  {content?.text ? (
                    <p>{content.text}</p>
                  ) : (
                    <span className="italic text-muted-foreground/60">
                      {t("VerseBoxTranslation.NoProvidedTranslation") ||
                        "No translation provided."}
                    </span>
                  )}
                </main>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

export default VerseTranslationTable;
