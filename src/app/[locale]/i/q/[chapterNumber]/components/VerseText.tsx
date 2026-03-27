"use client";

import React from "react";
import {observer} from "mobx-react-lite";
import {VersePlain} from "@/classes/Islam/Quran/Verse/Plain";
import {
    QuranTextVariationPreferences,
    QuranTextVariations
} from "@/configuration/UserPreferences/Islam/Quran/QuranTextVariationPreferences";
import {QuranViewPreferences} from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";

type Props = {
    verse: VersePlain
}

const VerseText: React.FC<Props> = observer(({verse}) => {
    const variationPreferences = QuranTextVariationPreferences.getInstance();
    const viewPreferences = QuranViewPreferences.getInstance();

    const preferences = variationPreferences.preferredVariations;
    const length = preferences.length;

    const selectedFont = viewPreferences.selectedArabicFont;
    const fontSize = viewPreferences.fontSize;

    return (
        <section className="flex w-full flex-col gap-6">
            {preferences.map(pref => {
                const prefix = providePrefix(pref);

                const verseText = verse[pref]

                return (
                    <div key={pref} className="flex w-full flex-col items-end gap-3">



                        <p
                            dir="rtl"
                            className={`w-full text-right leading-relaxed ${selectedFont.className}`}
                            style={{fontSize: `${fontSize}px`}}
                        >

                            {length > 1 && (
                                <span
                                    dir="ltr"
                                    className="inline-flex rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                                >
                               - {prefix}
                            </span>
                            )}
                            {verseText}
                        </p>
                    </div>
                );
            })}
        </section>
    );
});



export default VerseText;

const providePrefix = (variation: QuranTextVariations): string => {
    const pref = variation as string;

    const upperIndex = [...pref].findIndex(
        (char, i) => i > 0 && char === char.toUpperCase() && char !== char.toLowerCase()
    );

    if (upperIndex !== -1)
        return (pref[0] + pref[upperIndex]).toUpperCase();


    return pref.slice(0, 2).toUpperCase();
};

