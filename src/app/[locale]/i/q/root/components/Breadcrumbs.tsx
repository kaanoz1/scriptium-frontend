"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { HomeIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Breadcrumbs: React.FC = () => {
    const locale = useLocale();

    const t = useTranslations("Terms.Islam");
    const gt = useTranslations("Terms.General");

    return (
        <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-x-auto scrollbar-hide pb-2"
        >
            <Breadcrumb>
                <BreadcrumbList className="flex-nowrap whitespace-nowrap">
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href={`/${locale}`}
                            className="flex items-center gap-1.5 hover:text-primary transition-colors"
                        >
                            <HomeIcon size={14} />
                            <span className="hidden sm:inline">{gt("HomePage")}</span>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${locale}/i`} className="hover:text-primary transition-colors">
                            {t("this")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${locale}/i/q`} className="hover:text-primary transition-colors">
                            {t("Quran.this")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold text-foreground">
                            {t("Quran.Root.this")}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </motion.div>
    );
}

export default Breadcrumbs;