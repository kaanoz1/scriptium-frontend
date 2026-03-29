"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const DataSupplierSection: React.FC = () => {
    const t = useTranslations("Pages.About.DataSuppliers");

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-48 flex justify-center"
        >
            <div className="w-full max-w-4xl p-8 rounded-3xl bg-card border border-border/50 shadow-sm text-center">
                <Info className="w-10 h-10 mx-auto text-primary mb-4 opacity-80" />
                <h2 className="text-2xl font-bold mb-4">{t("Title")}</h2>
                <p className="text-muted-foreground mb-6">
                    {t("Description")}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline" asChild className="rounded-full">
                        <Link href="https://tanzil.net" target="_blank" rel="noopener noreferrer">
                            Tanzil.net <ExternalLink size={14} className="ml-2" />
                        </Link>
                    </Button>
                    <Button variant="outline" asChild className="rounded-full">
                        <Link href="https://acikkuran.com" target="_blank" rel="noopener noreferrer">
                            AçıkKuran <ExternalLink size={14} className="ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </motion.section>
    );
};

export default DataSupplierSection;