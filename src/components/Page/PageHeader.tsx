"use client";

import React from "react";
import { motion } from "framer-motion";
import { instrumentSerif } from "@/fonts";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  native?: React.ReactNode;
  nativeClassName?: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  align?: "left" | "center";
  serif?: boolean;
  titleClassName?: string;
  className?: string;
};

const PageHeader: React.FC<Props> = ({
  eyebrow,
  title,
  native,
  nativeClassName,
  description,
  actions,
  align = "left",
  serif = true,
  titleClassName,
  className,
}) => {
  const centered = align === "center";

  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex w-full flex-col gap-6",
        centered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3", centered && "items-center")}>
        {eyebrow && (
          <span className="inline-flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-6 bg-linear-to-r from-amber-500 to-emerald-500" />
            {eyebrow}
          </span>
        )}

        <div
          className={cn(
            "flex flex-wrap items-baseline gap-x-4 gap-y-1",
            centered && "justify-center",
          )}
        >
          <h1
            className={cn(
              serif
                ? `${instrumentSerif.className} text-5xl leading-[1.02] md:text-6xl lg:text-7xl`
                : "text-4xl font-bold tracking-tight md:text-5xl",
              "tracking-tight",
              titleClassName,
            )}
          >
            {title}
          </h1>
          {native && (
            <span
              className={cn(
                "text-3xl text-muted-foreground/80 md:text-4xl",
                nativeClassName,
              )}
            >
              {native}
            </span>
          )}
        </div>

        {description && (
          <p
            className={cn(
              "max-w-2xl text-base text-muted-foreground text-pretty md:text-lg",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        )}
      </div>

      {actions && <div className="flex shrink-0 items-center">{actions}</div>}
    </motion.header>
  );
};

export default PageHeader;
