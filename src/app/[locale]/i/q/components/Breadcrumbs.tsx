"use client";

import React from "react";
import {useLocale} from "use-intl";
import {HomeIcon} from "lucide-react";
import {motion} from "framer-motion";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {useTranslations} from "next-intl";

const Breadcrumbs: React.FC = () => {
    const locale = useLocale();

    const t = useTranslations("Terms.Islam");
    const gt = useTranslations("Terms.General");

    return (
        <motion.div
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
        >
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${locale}`}
                                        className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                            <HomeIcon size={14}/> {gt("HomePage")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${locale}/i`} className="hover:text-foreground transition-colors">
                            {t("this")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-medium text-foreground">{t("Quran.this")}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </motion.div>
    );
}

export default Breadcrumbs;