"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { instrumentSerif } from "@/fonts";
import PageBackdrop from "@/components/Page/PageBackdrop";

export type ErrorTemplateProps = {
  icon: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
  colors: {
    text: string;
    bg: string;
    glow: string;
  };
  fullPage?: boolean;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const ErrorTemplate: React.FC<ErrorTemplateProps> = ({
  icon,
  title,
  children,
  colors,
  fullPage = true,
}) => {
  return (
    <div
      className={cn(
        "relative isolate flex w-full flex-col items-center justify-center overflow-hidden px-6 text-center",
        fullPage ? "min-h-[calc(100vh-150px)] py-16" : "h-full min-h-100 py-12",
      )}
    >
      <PageBackdrop className="h-full" />
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[110px] dark:opacity-20 ${colors.glow}`}
      />

      <motion.div
        className="flex w-full max-w-xl flex-col items-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="relative">
          <span className="absolute inset-0 rotate-45 rounded-3xl border border-border/70" />
          <div
            className={`relative flex h-24 w-24 items-center justify-center rounded-3xl border border-border/70 bg-background/80 backdrop-blur ${colors.text}`}
          >
            {icon}
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className={cn(
            instrumentSerif.className,
            "tracking-tight",
            fullPage ? "text-5xl sm:text-6xl" : "text-3xl sm:text-4xl",
          )}
        >
          {title}
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center space-y-6"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorTemplate;
