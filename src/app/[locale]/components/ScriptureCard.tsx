"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { LuArrowRight, LuClock, LuLock } from "react-icons/lu";
import LoadingLink from "@/components/LoadingLink";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { itemVariants } from "./HeroSection";

type Props = {
  title: string;
  nativeTitle: string;
  description: string;
  icon: React.ReactNode;
  watermark: string;
  watermarkClassName?: string;
  accent: string;
  href?: string;
  ctaLabel?: string;
  disabledLabel?: string;
  disabledTooltip?: string;
  /** Shows a "coming soon" badge while keeping the card clickable. */
  comingSoon?: boolean;
  comingSoonLabel?: string;
  featured?: boolean;
  tags?: string[];
  className?: string;
};

const ScriptureCard: React.FC<Props> = ({
  title,
  nativeTitle,
  description,
  icon,
  watermark,
  watermarkClassName,
  accent,
  href,
  ctaLabel,
  disabledLabel,
  disabledTooltip,
  comingSoon = false,
  comingSoonLabel,
  featured = false,
  tags,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = !!href;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const body = (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      style={{ "--accent": accent } as React.CSSProperties}
      className={cn(
        "group/card relative isolate flex h-full flex-col overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 md:p-8",
        enabled
          ? "border-border/60 bg-card/70 backdrop-blur-sm hover:-translate-y-1 hover:border-[rgb(var(--accent)/0.45)] hover:shadow-xl hover:shadow-[rgb(var(--accent)/0.08)]"
          : "border-dashed border-border/70 bg-muted/20 cursor-help",
        featured ? "min-h-80 md:min-h-[26rem]" : "min-h-56",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgb(var(--accent) / 0.14), transparent 65%)",
        }}
      />

      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -z-10 select-none leading-none text-foreground/[0.05] transition-all duration-700 group-hover/card:text-[rgb(var(--accent)/0.14)]",
          featured
            ? "-bottom-6 -right-2 text-[9rem] md:text-[13rem]"
            : "-bottom-4 -right-1 text-[6rem]",
          watermarkClassName,
        )}
      >
        {watermark}
      </span>

      <div className="flex items-start justify-between">
        <div
          className={cn(
            "rounded-xl p-2.5 transition-colors",
            enabled
              ? "bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent))] group-hover/card:bg-[rgb(var(--accent))] group-hover/card:text-white"
              : "bg-muted text-muted-foreground",
          )}
        >
          {icon}
        </div>

        {!enabled && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <LuLock size={11} />
            {disabledLabel}
          </span>
        )}

        {enabled && comingSoon && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.08)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))] backdrop-blur">
            <LuClock size={11} />
            {comingSoonLabel}
          </span>
        )}
      </div>

      <div className={cn("mt-auto space-y-2 pt-10", !enabled && "opacity-70")}>
        <p className="text-sm font-medium text-muted-foreground">
          {nativeTitle}
        </p>
        <h3
          className={cn(
            "font-bold tracking-tight",
            featured ? "text-3xl md:text-4xl" : "text-2xl",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-sm leading-relaxed text-muted-foreground",
            featured ? "max-w-md md:text-base" : "max-w-xs",
          )}
        >
          {description}
        </p>

        {tags && tags.length > 0 && (
          <ul className="flex max-w-lg flex-wrap gap-1.5 pt-3">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border/70 bg-background/60 px-2.5 py-0.5 text-xs text-muted-foreground backdrop-blur"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {enabled && ctaLabel && (
          <span className="inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-[rgb(var(--accent))]">
            {ctaLabel}
            <LuArrowRight
              size={16}
              className="transition-transform group-hover/card:translate-x-1"
            />
          </span>
        )}
      </div>
    </div>
  );

  return (
    <motion.div variants={itemVariants} className={cn("h-full", className)}>
      {enabled ? (
        <LoadingLink
          href={href}
          className="block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {body}
        </LoadingLink>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{body}</TooltipTrigger>
            <TooltipContent className="max-w-62.5 p-3 text-center">
              <p className="text-xs leading-relaxed">{disabledTooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </motion.div>
  );
};

export default ScriptureCard;
