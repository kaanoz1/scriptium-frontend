"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { VerseComplete } from "@/classes/Islam/Quran/Verse/Complete";
import { QuranViewPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";

type Props = {
    verse: VerseComplete;
}

const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>?/gm, '');
};

const VerseTransliteration: React.FC<Props> = observer(({ verse }) => {
    const locale = useLocale();
    const preferences = QuranViewPreferences.getInstance();
    const t = useTranslations("Pages.Islam.Quran.Chapter.Verse.Components.VerseTransliterations");

    const transliteration = verse.transliterations.find(t => t.language.code === locale);

    return (
        <AnimatePresence>
            {preferences.shouldTransliterationShown && (
                <motion.footer
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 overflow-hidden"
                >
                    <div className="rounded-lg bg-muted/40 p-3.5 border border-border/50">
                        {transliteration ? (
                            <p className="text-[13px] leading-relaxed italic text-muted-foreground">
                                {stripHtml(transliteration.text)}
                            </p>
                        ) : (
                            <p className="text-[13px] italic text-muted-foreground/50">
                                {t("NoTransliterationAvailable")}
                            </p>
                        )}
                    </div>
                </motion.footer>
            )}
        </AnimatePresence>
    );
});

export default VerseTransliteration;