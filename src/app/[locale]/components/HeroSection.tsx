"use client";

import { motion, Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { LuArrowUpRight, LuSparkles } from "react-icons/lu";
import SearchBar from "@/components/Navbar/SearchBar";
import LoadingLink from "@/components/LoadingLink";
import { instrumentSerif } from "@/fonts";
import { cn } from "@/lib/utils";

export const itemVariants: Variants = {
  hidden: { y: 24, opacity: 0, filter: "blur(6px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const HeroSection = () => {
  const t = useTranslations("Pages.Home");
  const locale = useLocale();

  const quickLinks = [
    { label: t("QuickLinks.Fatiha"), ref: "1", href: `/${locale}/i/q/1` },
    { label: t("QuickLinks.AyatAlKursi"), ref: "2:255", href: `/${locale}/i/q/2/255` },
    { label: t("QuickLinks.Ikhlas"), ref: "112", href: `/${locale}/i/q/112` },
    { label: t("QuickLinks.Roots"), ref: "ك ت ب", href: `/${locale}/i/q/root` },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-8 text-center">
      <motion.div variants={itemVariants}>
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          <LuSparkles className="text-amber-500" size={13} />
          {t("Eyebrow")}
        </span>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-5">
        <h1
          className={cn(
            instrumentSerif.className,
            "text-6xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl",
          )}
        >
          Script
          <span className="italic bg-linear-to-br from-amber-600 via-foreground to-emerald-700 bg-clip-text text-transparent dark:from-amber-300 dark:via-foreground dark:to-emerald-300">
            ium
          </span>
        </h1>
        <p className="mx-auto max-w-xl text-base text-muted-foreground text-balance sm:text-lg">
          {t("HeroTagline")}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="relative z-20 w-full max-w-2xl">
        <div className="absolute -inset-px rounded-xl bg-linear-to-r from-amber-400/40 via-emerald-400/30 to-sky-400/40 opacity-60 blur-md" />
        <div className="relative rounded-xl bg-background shadow-2xl shadow-black/5 dark:shadow-black/40">
          <SearchBar isCentered={false} />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center justify-center gap-2"
      >
        <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
          {t("QuickAccess")}
        </span>
        {quickLinks.map((link) => (
          <LoadingLink
            key={link.href}
            href={link.href}
            className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 py-1 pl-3 pr-2 text-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-sm"
          >
            <span>{link.label}</span>
            <span className="rounded-full bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              {link.ref}
            </span>
            <LuArrowUpRight
              size={14}
              className="text-muted-foreground transition-transform group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-foreground"
            />
          </LoadingLink>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroSection;
