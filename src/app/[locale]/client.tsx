"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { FaCross, FaStarAndCrescent, FaStarOfDavid } from "react-icons/fa6";
import HeroSection, { itemVariants } from "./components/HeroSection";
import HeroBackground from "./components/HeroBackground";
import ScriptureCard from "./components/ScriptureCard";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { instrumentSerif } from "@/fonts";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.08 },
  },
};

const Client: React.FC = () => {
  const t = useTranslations("Pages.Home");
  const st = useTranslations("Pages.Islam.Index.Sciences");
  const ct = useTranslations("Pages.Christianity.Index.Sciences");
  const jt = useTranslations("Pages.Judaism.Index.Sciences");
  const locale = useLocale();

  return (
    <main className="relative overflow-hidden px-6 md:px-8">
      <HeroBackground />

      <motion.div
        className="mx-auto flex w-full max-w-6xl flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <section className="flex min-h-[calc(100vh-150px)] w-full items-center justify-center py-16">
          <HeroSection />
        </section>

        <section className="w-full pb-24">
          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-col gap-2 border-b border-border/60 pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <h2
              className={cn(
                instrumentSerif.className,
                "text-4xl tracking-tight md:text-5xl",
              )}
            >
              {t("CollectionTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("CollectionDescription")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2">
            <ScriptureCard
              featured
              className="md:col-span-2 md:row-span-2"
              title={t("IslamCard.Title")}
              nativeTitle={t("IslamCard.NativeTitle")}
              description={t("IslamCard.Description")}
              icon={<FaStarAndCrescent size={22} />}
              watermark="الإسلام"
              watermarkClassName={Amiri.className}
              accent="16 185 129"
              href={`/${locale}/i`}
              ctaLabel={t("Explore")}
              tags={[
                st("Quran.Title"),
                st("Tafsir.Title"),
                st("Hadith.Title"),
                st("Fiqh.Title"),
                st("Kalam.Title"),
                st("JarhTadil.Title"),
              ]}
            />
            <ScriptureCard
              title={t("ChristianityCard.Title")}
              nativeTitle={t("ChristianityCard.NativeTitle")}
              description={t("ChristianityCard.Description")}
              icon={<FaCross size={20} />}
              watermark="Χριστός"
              watermarkClassName={instrumentSerif.className}
              accent="59 130 246"
              href={`/${locale}/c`}
              ctaLabel={t("Explore")}
              tags={[
                ct("Bible.Title"),
                ct("Patristics.Title"),
                ct("Councils.Title"),
                ct("Dogmatics.Title"),
                ct("CanonLaw.Title"),
              ]}
            />
            <ScriptureCard
              title={t("JudaismCard.Title")}
              nativeTitle={t("JudaismCard.NativeTitle")}
              description={t("JudaismCard.Description")}
              icon={<FaStarOfDavid size={20} />}
              watermark="תורה"
              accent="245 158 11"
              href={`/${locale}/j`}
              ctaLabel={t("Explore")}
              tags={[
                jt("Tanakh.Title"),
                jt("Mishnah.Title"),
                jt("Talmud.Title"),
                jt("Midrash.Title"),
                jt("Halakha.Title"),
              ]}
            />
          </div>
        </section>
      </motion.div>
    </main>
  );
};

export default Client;
