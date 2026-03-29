"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";

const BetaWarningSection: React.FC = () => {
    const t = useTranslations("Pages.About.BetaWarning");

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-4xl px-4 sm:px-8"
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                <div className="p-3 bg-amber-500/20 rounded-full shrink-0">
                    <AlertTriangle size={24} />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{t("Title")}</h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                        {t("Description")}
                        <a href="mailto:info@scriptium.net" className="font-bold underline ml-1 hover:text-amber-500 transition-colors">
                            info@scriptium.net
                        </a>
                    </p>
                </div>
            </div>
        </motion.section>
    );
};

export default BetaWarningSection;