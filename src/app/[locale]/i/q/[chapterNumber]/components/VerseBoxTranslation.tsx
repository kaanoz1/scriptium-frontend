"use client";

import React from "react";
import {observer} from "mobx-react-lite";
import {VerseComplete} from "@/classes/Islam/Quran/Verse/Complete";
import {QuranTranslationPreferences} from "@/configuration/UserPreferences/Islam/Quran/QuranTranslationPreferences";
import {useTranslations} from "next-intl";

type Props = {
    verse: VerseComplete,
}

const VerseBoxTranslation: React.FC<Props> = observer(({verse}) => {

    const preferredTranslations = QuranTranslationPreferences.getInstance().preferredTranslations;
    const length = preferredTranslations.length;
    const isSingleTranslation = length === 1;

    const t = useTranslations("Pages.Islam.Quran.Chapter.Components.VerseContainer.VerseBox");


    return (
        <main className="flex flex-col gap-6">
            {preferredTranslations.map((transl, index) => {

                const translationName = transl.name;
                const firstAuthorName = transl.authors[0]?.name ?? "Unkown Author.";


                const translationText = verse.translations.find((translation) => translation.translation.id === transl.id)?.text ?? t("VerseBoxTranslation.NoProvidedTranslation");


                return (
                    <div
                        key={transl.id}
                        className={`flex flex-col gap-2 ${!isSingleTranslation && index !== 0 ? "pt-4 border-t border-border/30" : ""}`}
                    >
                        {!isSingleTranslation && (
                            <header className="flex items-center gap-2 mb-1">
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                                    {translationName}
                                </span>
                                <span className="text-[10px] font-medium text-muted-foreground italic">
                                   {firstAuthorName}
                                </span>
                            </header>
                        )}

                        <p className={`text-base leading-relaxed text-foreground/90 ${!isSingleTranslation ? "pl-3 border-l-2 border-primary/20" : ""}`}>
                            {translationText}
                        </p>
                    </div>
                );
            })}
        </main>
    );
});

export default VerseBoxTranslation;