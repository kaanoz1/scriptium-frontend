"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";

const BetaWarningSection: React.FC = () => {
  const t = useTranslations("Pages.About.BetaWarning");

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-start gap-4 rounded-2xl border border-amber-500/25 bg-amber-500/[0.07] p-5"
    >
      <div className="rounded-xl bg-amber-500/15 p-2.5 text-amber-600 dark:text-amber-400">
        <AlertTriangle size={20} />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-amber-700 dark:text-amber-300">
          {t("Title")}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-amber-900/80 dark:text-amber-100/70">
          {t("Description")}
          <a
            href="mailto:info@scriptium.net"
            className="ml-1 font-semibold underline decoration-amber-500/40 underline-offset-4 transition-colors hover:decoration-amber-500"
          >
            info@scriptium.net
          </a>
        </p>
      </div>
    </motion.section>
  );
};

export default BetaWarningSection;
