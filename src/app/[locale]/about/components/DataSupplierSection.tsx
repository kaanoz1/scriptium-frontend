"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Database } from "lucide-react";

const SUPPLIERS = [
  { name: "Tanzil.net", url: "https://tanzil.net/trans/" },
  { name: "AçıkKuran", url: "https://acikkuran.com" },
];

const DataSupplierSection: React.FC = () => {
  const t = useTranslations("Pages.About.DataSuppliers");

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-6 rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between md:p-8"
    >
      <div className="flex max-w-2xl items-start gap-4">
        <div className="rounded-xl bg-sky-500/10 p-2.5 text-sky-600 dark:text-sky-400">
          <Database size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{t("Title")}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {t("Description")}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {SUPPLIERS.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium transition-colors hover:border-sky-500/40"
          >
            {s.name}
            <ArrowUpRight
              size={14}
              className="text-muted-foreground transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
            />
          </a>
        ))}
      </div>
    </motion.section>
  );
};

export default DataSupplierSection;
