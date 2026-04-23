import React from "react";
import {VerseBoth} from "@/classes/Islam/Quran/Verse/Both";
import {QuranTranslationPreferences} from "@/configuration/UserPreferences/Islam/Quran/QuranTranslationPreferences";
import {TranslationComplete} from "@/classes/Islam/Quran/Translation/Complete";
import {useTranslations} from "next-intl";
import {observer} from "mobx-react-lite";

type Props = {
    verse: VerseBoth;
}

const VerseTranslation: React.FC<Props> = observer(({verse}) => {

    const preferredTranslations = QuranTranslationPreferences.getInstance().preferredTranslations;

    const t = useTranslations("Pages.Islam.Quran.Chapter.Verse.VerseTranslation");

    const translationShown: TranslationComplete[] = [];

    for (const t of preferredTranslations) {
        const translationFound = verse.translations.find(translation => translation.translation.id === t.id);

        if (translationFound)
            translationShown.push(translationFound.translation);
    }

    const isSingleTranslation = preferredTranslations.length === 1;


    return <main className="flex flex-col gap-6 w-full">
        {translationShown.map((transl, index) => {

            const translationName = transl.name;
            const authorNamesConcatenated = transl.authors.map(author => author.name).join(', ');

            const translationText = verse.translations.find((translation) => translation.translation.id === transl.id)?.text ?? t("VerseBoxTranslation.NoProvidedTranslation");


            return (
                <div
                    key={transl.id}
                    className={`flex flex-col gap-2 ${!isSingleTranslation && index !== 0 ? "pt-4 border-t border-border/30" : ""}`}
                >

                        <header className="flex items-center gap-2 mb-1">
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                                    {translationName}
                                </span>
                            <span className="text-[10px] font-medium text-muted-foreground italic">
                                   {authorNamesConcatenated}
                                </span>
                        </header>


                    <p className={`text-base leading-relaxed text-foreground/90 ${!isSingleTranslation ? "pl-3 border-l-2 border-primary/20" : ""}`}>
                        {translationText}
                    </p>
                </div>
            );
        })}
    </main>;
});

export default VerseTranslation;