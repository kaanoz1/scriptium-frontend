"use client"

import React from "react";
import {LuFileQuestion} from "react-icons/lu";
import ErrorTemplate from "./ErrorTemplate";
import {ErrorComponentProps} from "@/util/types/ErrorComponentProps";
import {useTranslations} from "next-intl";

const NotFoundError: React.FC<ErrorComponentProps> = ({
                                                          title,
                                                          fullPage = true,
                                                          children

                                                      }) => {
    const t = useTranslations("Util.Components.Error.NotFound");
    title = t("Title");
    const description = t("DefaultDescription");

    return (
        <ErrorTemplate
            icon={<LuFileQuestion size={48}/>}
            title={title}
            fullPage={fullPage}
            colors={{
                text: "text-blue-600 dark:text-blue-400",
                bg: "bg-blue-100 dark:bg-blue-500/10",
                glow: "bg-blue-500",
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

export default NotFoundError;