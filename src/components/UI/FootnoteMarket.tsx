"use client";

import { FC, useMemo, useState, useEffect } from "react";
import { Tooltip } from "@heroui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { cn } from "@heroui/theme";

type FootnoteMarkerProps = {
  indicator: number | string;
  content: string;
  tooltipClassNames: Record<string, string[]>;
};

const useHoverCapable = () => {
  const [hoverCapable, setHoverCapable] = useState<boolean>(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const set = () => setHoverCapable(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);
  return hoverCapable;
};

export const FootnoteMarker: FC<FootnoteMarkerProps> = ({
  indicator,
  content,
  tooltipClassNames,
}) => {
  const hoverCapable = useHoverCapable();
  const [open, setOpen] = useState(false);

  const MarkerButton = useMemo(
    () => (
      <button
        type="button"
        aria-label={`Footnote ${indicator}`}
        className={cn(
          "align-super leading-none cursor-pointer select-none px-0.5",
          "text-blue-600 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500",
          "dark:text-blue-400 dark:hover:text-blue-300"
        )}
        onClick={() => !hoverCapable && setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (!hoverCapable && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
      >
        <sup>[{indicator}]</sup>
      </button>
    ),
    [hoverCapable, indicator]
  );

  if (hoverCapable) {
    return (
      <Tooltip
        content={content}
        placement="top"
        classNames={tooltipClassNames}
        showArrow
        delay={200}
        closeDelay={0}
      >
        {MarkerButton}
      </Tooltip>
    );
  }

  return (
    <Popover
      isOpen={open}
      onOpenChange={setOpen}
      placement="top"
      shouldCloseOnBlur
      showArrow
      offset={6}
    >
      <PopoverTrigger>{MarkerButton}</PopoverTrigger>
      <PopoverContent className="max-w-[85vw] sm:max-w-xs text-sm leading-relaxed">
        {content}
      </PopoverContent>
    </Popover>
  );
};
