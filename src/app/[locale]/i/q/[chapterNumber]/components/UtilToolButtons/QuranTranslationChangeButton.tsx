"use client";

import React from "react";
import {observer} from "mobx-react-lite";
import {useTranslations} from "next-intl";
import {HiLanguage} from "react-icons/hi2";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {QuranTranslationPreferences} from "@/configuration/UserPreferences/Islam/Quran/QuranTranslationPreferences";

const QuranTranslationChangeButton: React.FC = observer(() => {
    const translationPreferences = QuranTranslationPreferences.getInstance();
    const allTranslations = translationPreferences.allTranslations;
    const t = useTranslations("Pages.Islam.Quran.Chapter.Components.VerseContainer.VerseContainerHeader.UtilToolButtons.QuranTranslationChangeButton");

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon"><HiLanguage size={18}/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>{t("Title")}</DialogTitle>
                    <DialogDescription>{t("Description")}</DialogDescription>
                </DialogHeader>

                <main className="grid gap-3 py-4 overflow-y-auto pr-2">
                    {allTranslations.map((translation) => {
                        const authorNames = translation.authors.map(a => a.name).join(", ");
                        const isChecked = translationPreferences.isPreferred(translation);

                        return (
                            <div
                                key={translation.id}
                                onClick={() => {
                                    const currentLength = translationPreferences.preferredTranslations.length;
                                    if (isChecked && currentLength > 1)
                                        translationPreferences.removePreferred(translation);
                                    else
                                        translationPreferences.addPreferredTranslation(translation);

                                }}
                                className={`flex items-start space-x-3 rounded-md border p-3 cursor-pointer transition-colors ${isChecked ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent/50'}`}
                            >
                                <Checkbox checked={isChecked} className="mt-1 pointer-events-none"/>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">{translation.name}</span>
                                    <span className="text-xs text-muted-foreground">{authorNames}</span>
                                </div>
                            </div>
                        );
                    })}
                </main>

                <DialogFooter className="mt-auto">
                    <DialogClose asChild>
                        <Button variant="default">{t("Done")}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

export default QuranTranslationChangeButton;