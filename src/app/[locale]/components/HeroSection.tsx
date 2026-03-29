"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const HeroSection = () => {
    const t = useTranslations("Pages.Home");

    return (
        <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-linear-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                Scriptium
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto italic">
                {t("HeroSubtitle")}
            </p>
        </motion.div>
    );
};

export default HeroSection;