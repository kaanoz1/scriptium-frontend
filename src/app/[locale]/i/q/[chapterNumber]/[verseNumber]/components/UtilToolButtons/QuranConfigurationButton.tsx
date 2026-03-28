"use client";

import React from "react";
import Link from "next/link";
import {observer} from "mobx-react-lite";
import {useTranslations, useLocale} from "next-intl";
import {IoSettingsOutline} from "react-icons/io5";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import {Switch} from "@/components/ui/switch";
import {Checkbox} from "@/components/ui/checkbox";
import {Separator} from "@/components/ui/separator";
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {QuranViewPreferences} from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";
import {
    QuranTextVariationPreferences,
    QuranTextVariations
} from "@/configuration/UserPreferences/Islam/Quran/QuranTextVariationPreferences";
import {ARABIC_FONT_INSTANCES} from "@/fonts/Arabic/_index";

const VARIATION_SAMPLES: Record<QuranTextVariations, string> = {
    [QuranTextVariations.uthmani]: "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ",
    [QuranTextVariations.uthmaniMinimal]: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    [QuranTextVariations.Simple]: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
    [QuranTextVariations.SimpleMinimal]: "بِسْمِ اللَّهِ الرَّرَّحْمَنِ الرَّحِيمِ",
    [QuranTextVariations.simpleClean]: "بسم الله الرحمن الرحيم",
    [QuranTextVariations.simplePlain]: "بسم الله الرحمن الرحيم",
};

const QuranConfigurationButton: React.FC = observer(() => {
    const viewSettings = QuranViewPreferences.getInstance();
    const variationSettings = QuranTextVariationPreferences.getInstance();
    const t = useTranslations("Pages.Islam.Quran.Chapter.Verse.Components.UtilToolButtons.QuranConfigurationButton");
    const locale = useLocale();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon"><IoSettingsOutline size={18}/></Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl md:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{t("Title")}</DialogTitle>
                    <DialogDescription>{t("Description")}</DialogDescription>
                </DialogHeader>

                <main className="grid grid-cols-1 md:grid-cols-2 gap-8 py-1">

                    <div className="flex flex-col gap-6">
                        <section className="space-y-3">
                            <h4 className="text-sm font-semibold">{t("FontFamily")}</h4>
                            <div className="grid grid-cols-1 gap-2 max-h-150 overflow-y-auto pr-2">
                                {Object.entries(ARABIC_FONT_INSTANCES).map(([key, font]) => {
                                    const isSelected = viewSettings.selectedArabicFont.name === font.name;
                                    return (
                                        <div
                                            key={key}
                                            onClick={() => viewSettings.selectedArabicFont = font}
                                            className={`flex items-center justify-between rounded-md border p-3 cursor-pointer transition-colors ${
                                                isSelected ? "border-primary bg-primary/5" : "border-border hover:bg-accent/50"
                                            }`}
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{font.name}</span>
                                                {font.description && <span
                                                    className="text-xs text-muted-foreground">{font.description}</span>}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`text-2xl ${font.className}`}>{font.sampleText}</span>
                                                <div
                                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                                                        isSelected ? "border-[5px] border-primary" : "border-muted-foreground/30"
                                                    }`}/>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold">{t("FontSize")}</h4>
                                <span className="text-sm font-bold text-primary">{viewSettings.fontSize}px</span>
                            </div>
                            <Slider
                                value={[viewSettings.fontSize]}
                                onValueChange={(val) => viewSettings.fontSize = val[0]}
                                max={QuranViewPreferences.MAX_FONT_SIZE}
                                min={QuranViewPreferences.MIN_FONT_SIZE}
                                step={1}
                                className="w-full"
                            />
                        </section>
                    </div>

                    <div className="flex flex-col gap-1">
                        <section className="space-y-3">
                            <h4 className="text-sm font-semibold">Text Variations</h4>
                            <div className="flex flex-col gap-2 max-h-100 overflow-y-auto pr-2">
                                {Object.values(QuranTextVariations).map((variation) => {
                                    const isSelected = variationSettings.isSelected(variation);
                                    return (
                                        <div
                                            key={variation}
                                            onClick={() => {
                                                if (isSelected) variationSettings.removePreference(variation);
                                                else variationSettings.addPreference(variation);
                                            }}
                                            className={`flex items-center justify-between gap-4 rounded-md border p-3 cursor-pointer transition-colors ${
                                                isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:bg-accent/50"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Checkbox checked={isSelected} className="pointer-events-none"/>
                                                <span className="text-sm font-medium capitalize whitespace-nowrap">
                                                    {variation.replace(/([A-Z])/g, ' $1').trim()}
                                                </span>
                                            </div>
                                            <span
                                                className={`text-right text-lg truncate ${viewSettings.selectedArabicFont.className}`}
                                                dir="rtl"
                                            >
                                                {VARIATION_SAMPLES[variation]}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <p className="text-[11px] text-muted-foreground italic leading-tight pt-1">
                                {t("Disclaimer")}

                                <Link
                                    href={`/${locale}/about#data-provider`}
                                    className="text-primary hover:underline underline-offset-2"
                                >
                                    {" "}
                                    {t("DataProvider")}

                                </Link>.
                            </p>
                        </section>

                        <Separator className="my-1"/>

                        <section className="space-y-4">
                            <h4 className="text-sm font-semibold">{t("ViewSettings")}</h4>

                            <div
                                className="flex items-center justify-between cursor-pointer rounded-md p-2 hover:bg-accent/50 transition-colors -mx-2"
                                onClick={() => viewSettings.toggleVerseTextShown()}>
                                <div className="space-y-0.5">
                                    <label
                                        className="text-[13px] font-semibold cursor-pointer">{t("ShowArabicText")}</label>
                                    <p className="text-xs text-muted-foreground">{t("ShowArabicTextDescription")}</p>
                                </div>
                                <Switch checked={viewSettings.shouldVerseTextShown} className="pointer-events-none"/>
                            </div>

                            <div
                                className="flex items-center justify-between cursor-pointer rounded-md p-2 hover:bg-accent/50 transition-colors -mx-2"
                                onClick={() => viewSettings.toggleTranslationShown()}>
                                <div className="space-y-0.5">
                                    <label
                                        className="text-[13px] font-semibold cursor-pointer">{t("ShowTranslation")}</label>
                                    <p className="text-xs text-muted-foreground">{t("ShowTranslationDescription")}</p>
                                </div>
                                <Switch checked={viewSettings.shouldTranslationShown} className="pointer-events-none"/>
                            </div>

                            <div
                                className="flex items-center justify-between cursor-pointer rounded-md p-2 hover:bg-accent/50 transition-colors -mx-2"
                                onClick={() => viewSettings.toggleTransliterationShown()}>
                                <div className="space-y-0.5">
                                    <label
                                        className="text-[13px] font-semibold cursor-pointer">{t("ShowTransliteration")}</label>
                                    <p className="text-xs text-muted-foreground">{t("ShowTransliterationDescription")}</p>
                                </div>
                                <Switch checked={viewSettings.shouldTransliterationShown}
                                        className="pointer-events-none"/>
                            </div>
                        </section>
                    </div>
                </main>

                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="default">{t("Done")}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

export default QuranConfigurationButton;