"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { VerseComplete } from "@/classes/Islam/Quran/Verse/Complete";
import { QuranTranslationPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranTranslationPreferences";
import { useTranslations } from "next-intl";

type Props = {
  verse: VerseComplete;
};

const VerseBoxTranslation: React.FC<Props> = observer(({ verse }) => {
  const preferredTranslations =
    QuranTranslationPreferences.getInstance().preferredTranslations;
  const length = preferredTranslations.length;
  const isSingleTranslation = length === 1;

  const t = useTranslations(
    "Pages.Islam.Quran.Chapter.Components.VerseContainer.VerseBox",
  );

  return (
    <div className="flex flex-col gap-5">
      {preferredTranslations.map((transl, index) => {
        const translationName = transl.name;
        const authors = transl.authors;
        const authorsConcatanated =
          authors
            .map((a) => a.name)
            .filter((name) => name != translationName)
            .join(", ") ?? "Unkown Author.";

        const translationText =
          verse.translations.find(
            (translation) => translation.translation.id === transl.id,
          )?.text ?? t("VerseBoxTranslation.NoProvidedTranslation");

        return (
          <div
            key={transl.id}
            className={`flex flex-col gap-2 ${!isSingleTranslation && index !== 0 ? "pt-4 border-t border-border/30" : ""}`}
          >
            {!isSingleTranslation && (
              <header className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                  {translationName}
                </span>
                <span className="text-[10px] font-medium text-muted-foreground italic">
                  {authorsConcatanated}
                </span>
              </header>
            )}

            <p
              className={`text-[15px] leading-7 text-foreground/90 md:text-base md:leading-8 ${!isSingleTranslation ? "border-l-2 border-emerald-500/25 pl-3" : ""}`}
            >
              {translationText}
            </p>
          </div>
        );
      })}
    </div>
  );
});

export default VerseBoxTranslation;
