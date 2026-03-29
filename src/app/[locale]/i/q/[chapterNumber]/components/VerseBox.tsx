"use client";

import React from "react";
import Link from "next/link";
import {observer} from "mobx-react-lite";
import {usePathname} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {LuExternalLink} from "react-icons/lu";
import {Button} from "@/components/ui/button";
import {VerseComplete} from "@/classes/Islam/Quran/Verse/Complete";
import {QuranViewPreferences} from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";
import VerseText from "@/app/[locale]/i/q/[chapterNumber]/components/VerseText";
import VerseBoxTranslation from "@/app/[locale]/i/q/[chapterNumber]/components/VerseBoxTranslation";
import ShareButton from "@/app/[locale]/i/q/[chapterNumber]/components/UtilToolButtons/ShareButton";
import {QuranTranslationPreferences} from "@/configuration/UserPreferences/Islam/Quran/QuranTranslationPreferences";
import {ChapterComplete} from "@/classes/Islam/Quran/Chapter/Complete";
import {ClientUtils} from "@/util/ClientUtils";

type Props = {
    chapter: ChapterComplete
    verse: VerseComplete
}

const VerseBox: React.FC<Props> = observer(({chapter, verse}) => {
    const preferences = QuranViewPreferences.getInstance();

    const locale = useLocale();

    const verseNumber = verse.sequence;
    const chapterNumber = chapter.sequence;
    const transliteration = verse.transliterations.find(t => t.language.code === locale);


    const t = useTranslations("Pages.Islam.Quran.Chapter.Components.VerseContainer.VerseBox");

    const preferredTranslations = QuranTranslationPreferences.getInstance().preferredTranslations;

    const shareText = ClientUtils.Islam.Quran.Verse.createVerseShareText(chapter, verse, preferredTranslations, locale)


    return (
        <aside
            className="group relative flex flex-col gap-4 rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-md dark:bg-card/50">

            <header className="flex w-full items-center justify-between">
                <div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {verseNumber}
                </div>

                <div className="flex gap-2 opacity-60 transition-opacity group-hover:opacity-100">
                    <Button variant="ghost" size="icon" asChild>
                      <ShareButton shareText={shareText} />
                    </Button>

                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/${locale}/i/q/${chapterNumber}/${verseNumber}`}>
                            <LuExternalLink size={16}/>
                        </Link>
                    </Button>
                </div>
            </header>

            <main className="flex flex-col gap-6">
                {preferences.shouldVerseTextShown && (
                    <div className="w-full text-right">
                        <VerseText verse={verse}/>
                    </div>
                )}

                {preferences.shouldTranslationShown && (
                    <div className="w-full border-t border-border/40 pt-4">
                        <VerseBoxTranslation verse={verse}/>
                    </div>
                )}
            </main>

            {preferences.shouldTransliterationShown && (
                <footer className="mt-2 rounded-lg bg-muted/50 p-3">
                    {transliteration ? (
                        <p className="text-sm italic text-muted-foreground">
                            {stripHtml(transliteration.text)}
                        </p>
                    ) : (
                        <p className="text-sm italic text-muted-foreground opacity-50">{t("NoTransliterationAvailable")}</p>
                    )}
                </footer>
            )}
        </aside>
    );
});

export default VerseBox;

const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>?/gm, '');
};