"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Header = () => {
    const t = useTranslations("Pages.Islam.Quran.Root.Components.Header");

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center text-center gap-4"
        >
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                {t("Header")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {t("Description")}
            </p>
        </motion.div>
    );
}

export default Header;