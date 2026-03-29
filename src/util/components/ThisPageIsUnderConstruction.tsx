"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HardHat, Settings } from "lucide-react";

const ThisPageIsUnderConstruction: React.FC = () => {

    const t = useTranslations("Util.Components.ThisPageIsUnderConstruction");

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] px-4 text-center">

            <div className="relative mb-8 flex items-center justify-center h-32 w-32 rounded-full bg-muted/50 border border-border/50 shadow-inner">

                <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                    }}
                >
                    <HardHat size={56} className="text-primary" />
                </motion.div>

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "linear"
                    }}
                    className="absolute -bottom-1 -right-1 rounded-full bg-background p-1.5 shadow-sm border border-border/50"
                >
                    <Settings size={24} className="text-muted-foreground" />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-3"
            >
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                    {t("Header")}
                </h1>
                <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                    {t("Description")}
                </p>
            </motion.div>

        </div>
    );
};

export default ThisPageIsUnderConstruction;