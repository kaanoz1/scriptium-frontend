"use client";

import React from "react";
import {HomeIcon} from "lucide-react";
import {motion} from "framer-motion";
import {observer} from "mobx-react-lite";
import {useLocale, useTranslations} from "next-intl";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {ChapterComplete} from "@/classes/Islam/Quran/Chapter/Complete";

type Props = {
    chapter: ChapterComplete;
}

const Breadcrumbs: React.FC<Props> = observer(({chapter}) => {
    const locale = useLocale();
    const t = useTranslations("Terms.Islam");
    const gt = useTranslations("Terms.General");

    const chapterNumber = chapter.sequence;

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
                                        className="flex items-center gap-1.5 transition-colors hover:text-foreground">
                            <HomeIcon size={14}/> {gt("HomePage")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${locale}/i`} className="transition-colors hover:text-foreground">
                            {t("this")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${locale}/i/q`} className="transition-colors hover:text-foreground">
                            {t("Quran.this")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-medium text-foreground">
                            {chapterNumber}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </motion.div>
    );
});

export default Breadcrumbs;