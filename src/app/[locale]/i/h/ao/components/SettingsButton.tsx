"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { LuSettings2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ARABIC_FONT_INSTANCES } from "@/fonts/Arabic/_index";
import { HadithViewPreferences } from "@/configuration/UserPreferences/Islam/Hadith/HadithViewPreferences";
import { cn } from "@/lib/utils";

/** Reading settings: Arabic font, size and annotation toggles. */
type Props = {
  /** Isnad / highlighting toggles (pages that show a full hadith text). */
  showToggles?: boolean;
  /** Isnad tree toggle (pages that draw one). */
  showTreeToggle?: boolean;
};

const SettingsButton: React.FC<Props> = observer(({ showToggles = true, showTreeToggle = false }) => {
  const t = useTranslations("Pages.Islam.Hadith.Settings");
  const prefs = HadithViewPreferences.getInstance();

  useEffect(() => prefs.hydrate(), [prefs]);

  type Toggle = {
    key: "ShowIsnad" | "ShowIsnadTree" | "HighlightNarrators" | "HighlightQuran";
    value: boolean;
    set: (v: boolean) => void;
  };
  // Text toggles only matter where a full hadith text is shown.
  const textToggles: Toggle[] = [
    { key: "ShowIsnad", value: prefs.showIsnad, set: (v) => (prefs.showIsnad = v) },
    { key: "HighlightNarrators", value: prefs.highlightNarrators, set: (v) => (prefs.highlightNarrators = v) },
    { key: "HighlightQuran", value: prefs.highlightQuran, set: (v) => (prefs.highlightQuran = v) },
  ];
  const treeToggle: Toggle = { key: "ShowIsnadTree", value: prefs.showIsnadTree, set: (v) => (prefs.showIsnadTree = v) };
  const toggles = [...(showToggles ? textToggles : []), ...(showTreeToggle ? [treeToggle] : [])];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="lg" aria-label={t("Title")}>
          <LuSettings2 />
          <span className="hidden sm:inline">{t("Title")}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-80 flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label>{t("Font")}</Label>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.values(ARABIC_FONT_INSTANCES).map((f) => (
              <button
                key={f.name}
                type="button"
                onClick={() => (prefs.font = f)}
                className={cn(
                  "rounded-lg border px-2 py-1.5 text-lg transition-colors",
                  f.className,
                  prefs.font.name === f.name ? "border-foreground/40 bg-muted" : "border-border/60 hover:bg-muted/60",
                )}
              >
                <span dir="rtl">حدثنا</span>
                <span className="ml-2 font-sans text-[10px] text-muted-foreground">{f.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label>{t("FontSize")}</Label>
            <span className="text-xs tabular-nums text-muted-foreground">{prefs.fontSize}px</span>
          </div>
          <Slider
            min={HadithViewPreferences.MIN_FONT_SIZE}
            max={HadithViewPreferences.MAX_FONT_SIZE}
            step={1}
            value={[prefs.fontSize]}
            onValueChange={(v) => (prefs.fontSize = v[0])}
          />
        </div>
        {toggles.map((tg) => (
            <div key={tg.key} className="flex items-center justify-between gap-3">
              <Label htmlFor={`hadith-${tg.key}`} className="flex flex-col items-start gap-0.5">
                <span>{t(`${tg.key}.Title`)}</span>
                <span className="text-xs font-normal text-muted-foreground">{t(`${tg.key}.Description`)}</span>
              </Label>
              <Switch id={`hadith-${tg.key}`} checked={tg.value} onCheckedChange={tg.set} />
            </div>
          ))}
      </PopoverContent>
    </Popover>
  );
});

export default SettingsButton;
