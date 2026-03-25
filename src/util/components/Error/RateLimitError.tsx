"use client"

import React from "react";
import { LuTimer } from "react-icons/lu";
import ErrorTemplate from "./ErrorTemplate";
import {ErrorComponentProps} from "@/util/types/ErrorComponentProps";
import {useTranslations} from "next-intl";

const RateLimitError: React.FC<ErrorComponentProps> = ({
                                                           title,
                                                           fullPage = true,
                                                           children
                                                       }) => {


    const t = useTranslations("Util.Components.Error.RateLimit");
    title = t("Title");
    const description = t("DefaultDescription");

    return (
        <ErrorTemplate
            icon={<LuTimer size={48} />}
            title={title}
            fullPage={fullPage}
            colors={{
                text: "text-amber-600 dark:text-amber-500",
                bg: "bg-amber-100 dark:bg-amber-500/10",
                glow: "bg-amber-500",
            }}
        >
            {children || (
                <p className="text-lg text-muted-foreground max-w-md">
                    {description}
                </p>
            )}
        </ErrorTemplate>
    );
};

export default RateLimitError;