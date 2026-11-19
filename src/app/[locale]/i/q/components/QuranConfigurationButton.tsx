"use client";

import React, { useId } from "react";
import { observer } from "mobx-react-lite";
import { useLocale, useTranslations } from "next-intl";
import { IoSettingsOutline } from "react-icons/io5";
import { LuCheck, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QuranViewPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";
import {
  QuranTextVariationPreferences,
  QuranTextVariations,
} from "@/configuration/UserPreferences/Islam/Quran/QuranTextVariationPreferences";
import { ARABIC_FONT_INSTANCES } from "@/fonts/Arabic/_index";
import LoadingLink from "@/components/LoadingLink";
import { cn } from "@/lib/utils";

const VARIATION_SAMPLES: Record<QuranTextVariations, string> = {
  [QuranTextVariations.uthmani]: "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ",
  [QuranTextVariations.uthmaniMinimal]:
    "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
  [QuranTextVariations.Simple]: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  [QuranTextVariations.SimpleMinimal]:
    "بِسْمِ اللَّهِ الرَّرَّحْمَنِ الرَّحِيمِ",
  [QuranTextVariations.simpleClean]: "بسم الله الرحمن الرحيم",
  [QuranTextVariations.simplePlain]: "بسم الله الرحمن الرحيم",
};

const PREVIEW_TEXT = VARIATION_SAMPLES[QuranTextVariations.uthmani];

const formatVariationName = (variation: string) =>
  variation.replace(/([A-Z])/g, " $1").trim();

const SectionTitle: React.FC<{
  children: React.ReactNode;
  aside?: React.ReactNode;
}> = ({ children, aside }) => (
  <div className="flex items-center justify-between gap-3 pb-3">
    <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </h4>
    {aside}
  </div>
);

type ToggleRowProps = {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
};

const ToggleRow: React.FC<ToggleRowProps> = ({
  label,
  description,
  checked,
  onToggle,
}) => {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-muted/50"
    >
      <span className="min-w-0 space-y-0.5">
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-muted-foreground">
          {description}
        </span>
      </span>
      <Switch id={id} checked={checked} onCheckedChange={onToggle} />
    </label>
  );
};

/** Reading settings dialog, shared by the chapter, verse and root pages. */
const QuranConfigurationButton: React.FC = observer(() => {
  const viewSettings = QuranViewPreferences.getInstance();
  const variationSettings = QuranTextVariationPreferences.getInstance();
  const t = useTranslations(
    "Pages.Islam.Quran.Chapter.Components.VerseContainer.VerseContainerHeader.UtilToolButtons.QuranConfigurationButton",
  );
  const locale = useLocale();

  const selectedFont = viewSettings.selectedArabicFont;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("Title")}>
          <IoSettingsOutline size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="block max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain p-0 sm:max-w-3xl"
      >
        <DialogHeader className="sticky top-0 z-10 flex-row items-start justify-between gap-4 border-b border-border/60 bg-popover px-5 pb-4 pt-5 text-left sm:px-6">
          <div className="min-w-0 space-y-1.5">
            <DialogTitle className="text-lg">{t("Title")}</DialogTitle>
            <DialogDescription>{t("Description")}</DialogDescription>
          </div>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="-mr-2 -mt-1 shrink-0"
              aria-label={t("Done")}
            >
              <LuX />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-7 px-5 py-5 sm:px-6">
          {/* Live preview */}
          <section className="overflow-hidden rounded-xl border border-border/60 bg-muted/30">
            <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span>{t("Preview")}</span>
              <span className="font-mono normal-case tracking-normal tabular-nums">
                {selectedFont.name} · {viewSettings.fontSize}px
              </span>
            </div>
            <div className="max-h-56 overflow-y-auto px-4 py-6">
              <p
                dir="rtl"
                className={cn(
                  "text-center leading-[1.9] wrap-break-word",
                  selectedFont.className,
                )}
                style={{ fontSize: viewSettings.fontSize }}
              >
                {PREVIEW_TEXT}
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {/* Typography */}
            <div className="space-y-7">
              <section>
                <SectionTitle
                  aside={
                    <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs font-semibold tabular-nums">
                      {viewSettings.fontSize}px
                    </span>
                  }
                >
                  {t("FontSize")}
                </SectionTitle>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "text-sm text-muted-foreground",
                      selectedFont.className,
                    )}
                  >
                    ع
                  </span>
                  <Slider
                    value={[viewSettings.fontSize]}
                    onValueChange={(val) => (viewSettings.fontSize = val[0])}
                    max={QuranViewPreferences.MAX_FONT_SIZE}
                    min={QuranViewPreferences.MIN_FONT_SIZE}
                    step={1}
                    className="flex-1"
                    aria-label={t("FontSize")}
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "text-2xl text-muted-foreground",
                      selectedFont.className,
                    )}
                  >
                    ع
                  </span>
                </div>
              </section>

              <section>
                <SectionTitle>{t("FontFamily")}</SectionTitle>
                <div
                  role="radiogroup"
                  aria-label={t("FontFamily")}
                  className="grid grid-cols-2 gap-2"
                >
                  {Object.entries(ARABIC_FONT_INSTANCES).map(([key, font]) => {
                    const isSelected = selectedFont.name === font.name;
                    return (
                      <button
                        key={key}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => (viewSettings.selectedArabicFont = font)}
                        className={cn(
                          "group relative flex min-w-0 flex-col gap-2 rounded-xl border p-3 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          isSelected
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border/70 hover:border-foreground/25 hover:bg-muted/50",
                        )}
                      >
                        <span
                          dir="rtl"
                          className={cn(
                            "block truncate text-right text-xl leading-relaxed",
                            font.className,
                          )}
                        >
                          {font.sampleText}
                        </span>
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate text-xs font-medium">
                            {font.name}
                          </span>
                          <span
                            className={cn(
                              "flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted-foreground/30",
                            )}
                          >
                            {isSelected && <LuCheck size={10} strokeWidth={3} />}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Content */}
            <div className="space-y-7">
              <section>
                <SectionTitle>{t("TextVariations")}</SectionTitle>
                <div className="divide-y divide-border/60 overflow-hidden rounded-xl border border-border/60">
                  {Object.values(QuranTextVariations).map((variation) => {
                    const isSelected = variationSettings.isSelected(variation);
                    const toggle = () =>
                      isSelected
                        ? variationSettings.removePreference(variation)
                        : variationSettings.addPreference(variation);
                    return (
                      <label
                        key={variation}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors",
                          isSelected ? "bg-primary/5" : "hover:bg-muted/50",
                        )}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={toggle}
                        />
                        <span className="shrink-0 text-sm font-medium capitalize">
                          {formatVariationName(variation)}
                        </span>
                        <span
                          dir="rtl"
                          className={cn(
                            "min-w-0 flex-1 truncate text-right text-lg text-muted-foreground",
                            selectedFont.className,
                          )}
                        >
                          {VARIATION_SAMPLES[variation]}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <p className="pt-2.5 text-[11px] leading-snug text-muted-foreground">
                  {t("Disclaimer")}{" "}
                  <LoadingLink
                    href={`/${locale}/about#data-provider`}
                    className="font-medium text-primary underline-offset-2 hover:underline"
                  >
                    {t("DataProvider")}
                  </LoadingLink>
                  .
                </p>
              </section>

              <section>
                <SectionTitle>{t("ViewSettings")}</SectionTitle>
                <div className="divide-y divide-border/60 overflow-hidden rounded-xl border border-border/60">
                  <ToggleRow
                    label={t("ShowArabicText")}
                    description={t("ShowArabicTextDescription")}
                    checked={viewSettings.shouldVerseTextShown}
                    onToggle={() => viewSettings.toggleVerseTextShown()}
                  />
                  <ToggleRow
                    label={t("ShowTranslation")}
                    description={t("ShowTranslationDescription")}
                    checked={viewSettings.shouldTranslationShown}
                    onToggle={() => viewSettings.toggleTranslationShown()}
                  />
                  <ToggleRow
                    label={t("ShowTransliteration")}
                    description={t("ShowTransliterationDescription")}
                    checked={viewSettings.shouldTransliterationShown}
                    onToggle={() => viewSettings.toggleTransliterationShown()}
                  />
                </div>
              </section>
            </div>
          </div>
        </div>

        <DialogFooter className="sticky bottom-0 z-10 m-0 rounded-none border-t border-border/60 bg-popover px-5 py-3 sm:px-6">
          <DialogClose asChild>
            <Button className="w-full sm:w-auto">{t("Done")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default QuranConfigurationButton;
