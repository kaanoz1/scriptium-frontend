"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { useLocale, useTranslations } from "next-intl";
import { LuExternalLink } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { VerseComplete } from "@/classes/Islam/Quran/Verse/Complete";
import { QuranViewPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";
import VerseText from "@/app/[locale]/i/q/[chapterNumber]/components/VerseText";
import VerseBoxTranslation from "@/app/[locale]/i/q/[chapterNumber]/components/VerseBoxTranslation";
import ShareButton from "@/app/[locale]/i/q/[chapterNumber]/components/UtilToolButtons/ShareButton";
import { QuranTranslationPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranTranslationPreferences";
import { ChapterComplete } from "@/classes/Islam/Quran/Chapter/Complete";
import { ClientUtils } from "@/util/ClientUtils";
import LoadingLink from "@/components/LoadingLink";

type Props = {
  chapter: ChapterComplete;
  verse: VerseComplete;
};

const VerseBox: React.FC<Props> = observer(({ chapter, verse }) => {
  const preferences = QuranViewPreferences.getInstance();

  const locale = useLocale();

  const verseNumber = verse.sequence;
  const chapterNumber = chapter.sequence;
  const transliteration = verse.transliterations.find(
    (t) => t.language.code === locale,
  );

  const t = useTranslations(
    "Pages.Islam.Quran.Chapter.Components.VerseContainer.VerseBox",
  );

  const preferredTranslations =
    QuranTranslationPreferences.getInstance().preferredTranslations;

  const shareText = ClientUtils.Islam.Quran.Verse.createVerseShareText(
    chapter,
    verse,
    preferredTranslations,
    locale,
  );

  return (
    <article
      id={`verse-${verseNumber}`}
      className="group relative scroll-mt-40 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-card hover:shadow-lg hover:shadow-black/[0.03] md:p-7"
    >
      <header className="mb-5 flex w-full items-center justify-between">
        <LoadingLink
          href={`/${locale}/i/q/${chapterNumber}/${verseNumber}`}
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 py-1 pl-1 pr-3 text-xs text-muted-foreground transition-colors hover:border-emerald-500/40 hover:text-foreground"
        >
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-foreground px-1.5 text-[11px] font-semibold tabular-nums text-background">
            {verseNumber}
          </span>
          <span className="font-mono tabular-nums">
            {chapterNumber}:{verseNumber}
          </span>
        </LoadingLink>

        <div className="flex gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
          <Button variant="ghost" size="icon" asChild>
            <ShareButton shareText={shareText} />
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <LoadingLink
              href={`/${locale}/i/q/${chapterNumber}/${verseNumber}`}
            >
              <LuExternalLink size={16} />
            </LoadingLink>
          </Button>
        </div>
      </header>

      <div className="flex flex-col gap-6">
        {preferences.shouldVerseTextShown && (
          <div className="w-full text-right">
            <VerseText verse={verse} />
          </div>
        )}

        {preferences.shouldTranslationShown && (
          <div className="w-full border-t border-dashed border-border/60 pt-5">
            <VerseBoxTranslation verse={verse} />
          </div>
        )}
      </div>

      {preferences.shouldTransliterationShown && (
        <footer className="mt-5 rounded-xl border border-border/40 bg-muted/40 px-4 py-3">
          {transliteration ? (
            <p className="text-sm italic leading-relaxed text-muted-foreground">
              {stripHtml(transliteration.text)}
            </p>
          ) : (
            <p className="text-sm italic text-muted-foreground opacity-50">
              {t("NoTransliterationAvailable")}
            </p>
          )}
        </footer>
      )}
    </article>
  );
});

export default VerseBox;

const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>?/gm, "");
};
