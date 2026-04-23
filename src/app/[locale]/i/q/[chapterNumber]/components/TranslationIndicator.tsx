"use client";

import React from "react";
import {observer} from "mobx-react-lite";
import {useTranslations} from "next-intl";
import {IoBookOutline} from "react-icons/io5";
import {QuranTranslationPreferences} from "@/configuration/UserPreferences/Islam/Quran/QuranTranslationPreferences";

const TranslationIndicator: React.FC = observer(() => {
    const t = useTranslations("Pages.Islam.Quran.Chapter.Components.TranslationIndicator");
    const preferences = QuranTranslationPreferences.getInstance().preferredTranslations;
    const length = preferences.length;

    let text;

    if (length === 1) {
        const authorsConcatenated = preferences[0].authors.map(a => a.name).join(", ");

        text = authorsConcatenated.length > 0
            ? `${preferences[0].name} (${authorsConcatenated})`
            : preferences[0].name;
    } else {
        text = `${length} ${t("Translations")}`;
    }

    return (
        <div
            className="flex sm:inline-flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm font-medium text-secondary-foreground shadow-sm backdrop-blur-sm"
        >
            <IoBookOutline size={16} className="text-primary shrink-0"/>
            <span className="truncate max-w-none sm:max-w-75 text-center sm:text-left">
        {text}
    </span>
        </div>
    );
});

export default TranslationIndicator;