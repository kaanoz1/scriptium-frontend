"use client"

import React from "react";
import ErrorTemplate from "./ErrorTemplate";
import {ErrorComponentProps} from "@/util/types/ErrorComponentProps";
import {FiAlertOctagon} from "react-icons/fi";
import {useTranslations} from "next-intl";

const UnknownError: React.FC<ErrorComponentProps> = ({
                                                         title,
                                                         fullPage = true,
                                                         children
                                                     }) => {

    const t = useTranslations("Util.Components.Error.UnknownError");
    title = t("Title");
    const description = t("DefaultDescription");
    return (
        <ErrorTemplate
            icon={<FiAlertOctagon size={48}/>}
            title={title}
            fullPage={fullPage}
            colors={{
                text: "text-purple-600 dark:text-purple-400",
                bg: "bg-purple-100 dark:bg-purple-500/10",
                glow: "bg-purple-500",
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

export default UnknownError;