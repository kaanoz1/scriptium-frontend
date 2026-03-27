"use client";

import React from "react";
import {motion} from "framer-motion";
import {observer} from "mobx-react-lite";
import {useLocale, useTranslations} from "next-intl";
import {ChapterComplete} from "@/classes/Islam/Quran/Chapter/Complete";
import {QuranViewPreferences} from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";

type Props = {
    chapter: ChapterComplete
}

const Header: React.FC<Props> = observer(({chapter}) => {
    const gt = useTranslations("Terms.Islam.Quran.Chapter");
    const locale = useLocale();

    const chapterNumber = chapter.sequence;
    const chapterNameOriginal = chapter.name;
    const chapterNameTranslation = chapter.meanings.find(m => m.language.code === locale);

    const selectedFont = QuranViewPreferences.getInstance().selectedArabicFont;

    return (
        <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: "easeOut"}}
            className="flex flex-col items-start gap-3 pb-6"
        >
            <div className="flex flex-col gap-1">
                <span className="text-sm font-bold uppercase tracking-widest text-primary pb-3">
                    {gt("this")} {chapterNumber}
                </span>

                <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl flex flex-wrap items-baseline gap-3">
                    <p className={selectedFont.className}>
                        {chapterNameOriginal}

                    </p>
                    {chapterNameTranslation && (
                        <span className="text-2xl font-semibold text-muted-foreground md:text-3xl lg:text-4xl">
                            {chapterNameTranslation.text}
                        </span>
                    )}
                </h1>
            </div>

            <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
                {/*t("Description") */}
            </p>
        </motion.div>
    );
});

export default Header;