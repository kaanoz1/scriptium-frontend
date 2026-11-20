"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import PageShell from "@/components/Page/PageShell";
import PageHeader from "@/components/Page/PageHeader";
import PageBreadcrumbs, { Crumb } from "@/components/Page/PageBreadcrumbs";
import ScriptureCard from "@/app/[locale]/components/ScriptureCard";

export type TraditionSection = {
  /** Key under `Pages.<Tradition>.Index.Sciences`. */
  key: string;
  icon: React.ReactNode;
  /** RGB triplet, e.g. "16 185 129". */
  accent: string;
  /** Path relative to the tradition's base path. Undefined = not available yet. */
  path?: string;
  /** Large decorative text; defaults to the native title. */
  watermark?: string;
};

type Props = {
  /** Translation namespace, e.g. "Pages.Islam.Index". */
  namespace: string;
  /** Base route segment of the tradition, e.g. "i". */
  basePath: string;
  native: string;
  nativeClassName?: string;
  /** Font class for card watermarks. */
  watermarkClassName?: string;
  sections: TraditionSection[];
  /** Crumbs between "Home" and this page, e.g. "Islam" for a discipline index. */
  parentCrumbs?: Crumb[];
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

/**
 * Landing page of a tradition (Islam, Christianity, Judaism…): a header and a
 * grid of its disciplines / bodies of literature. The first section is featured.
 */
const TraditionIndex: React.FC<Props> = ({
  namespace,
  basePath,
  native,
  nativeClassName,
  watermarkClassName,
  sections,
  parentCrumbs = [],
}) => {
  const locale = useLocale();
  const t = useTranslations(namespace);
  const mt = useTranslations("Pages.Home.Messages");

  const availableCount = sections.filter((s) => s.path).length;

  return (
    <PageShell size="lg">
      <PageBreadcrumbs items={[...parentCrumbs, { label: t("Title") }]} />

      <PageHeader
        eyebrow={t("Eyebrow")}
        title={t("Title")}
        native={native}
        nativeClassName={nativeClassName}
        description={t("Description")}
        actions={
          <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/70 px-4 py-3 backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              {availableCount > 0 && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              )}
              <span
                className={`relative inline-flex h-2.5 w-2.5 rounded-full ${availableCount > 0 ? "bg-emerald-500" : "bg-muted-foreground/40"}`}
              />
            </span>
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold tabular-nums text-foreground">
                {availableCount}/{sections.length}
              </span>{" "}
              {t("Available")}
            </span>
          </div>
        }
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {sections.map((section, i) => {
          const featured = i === 0;
          const nativeTitle = t(`Sciences.${section.key}.NativeTitle`);
          return (
            <ScriptureCard
              key={section.key}
              featured={featured}
              className={featured ? "sm:col-span-2 lg:row-span-2" : undefined}
              title={t(`Sciences.${section.key}.Title`)}
              nativeTitle={nativeTitle}
              description={t(`Sciences.${section.key}.Description`)}
              icon={section.icon}
              watermark={section.watermark ?? nativeTitle.split(" ").pop() ?? ""}
              watermarkClassName={`${watermarkClassName ?? ""} ${featured ? "" : "text-[4.5rem]!"}`}
              accent={section.accent}
              href={section.path ? `/${locale}/${basePath}/${section.path}` : undefined}
              ctaLabel={t("Open")}
              disabledLabel={t("ComingSoon")}
              disabledTooltip={mt("DatabaseIncapability")}
            />
          );
        })}
      </motion.div>
    </PageShell>
  );
};

export default TraditionIndex;
