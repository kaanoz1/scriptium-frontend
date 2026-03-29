"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BookOpen } from "lucide-react";

const WhatIsScriptiumSection: React.FC = () => {
    const t = useTranslations("Pages.About.WhatIsScriptium");

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-48 text-center flex flex-col items-center"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <BookOpen size={16} />
                <span>{t("Badge")}</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                {t("Title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                {t("Description")}
            </p>
        </motion.section>
    );
};

export default WhatIsScriptiumSection;