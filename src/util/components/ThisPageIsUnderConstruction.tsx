"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, HardHat } from "lucide-react";
import PageBackdrop from "@/components/Page/PageBackdrop";
import LoadingLink from "@/components/LoadingLink";
import { instrumentSerif } from "@/fonts";
import { cn } from "@/lib/utils";

const ThisPageIsUnderConstruction: React.FC = () => {
  const t = useTranslations("Util.Components.ThisPageIsUnderConstruction");
  const gt = useTranslations("Terms.General");
  const locale = useLocale();

  return (
    <div className="relative isolate flex min-h-[calc(100vh-150px)] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center">
      <PageBackdrop className="h-full" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-lg flex-col items-center gap-6"
      >
        <div className="relative">
          <motion.span
            className="absolute -inset-3 rounded-[2rem] border border-dashed border-border"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-border/70 bg-background/80 text-amber-500 backdrop-blur">
            <HardHat size={40} />
          </div>
        </div>

        <h1 className={cn(instrumentSerif.className, "text-5xl tracking-tight md:text-6xl")}>
          {t("Header")}
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("Description")}
        </p>

        <LoadingLink
          href={`/${locale}`}
          className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:border-foreground/30"
        >
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
          {gt("HomePage")}
        </LoadingLink>
      </motion.div>
    </div>
  );
};

export default ThisPageIsUnderConstruction;
