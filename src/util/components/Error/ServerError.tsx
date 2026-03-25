"use client"

import React from "react";
import {LuServerCrash} from "react-icons/lu";
import ErrorTemplate from "./ErrorTemplate";
import {ErrorComponentProps} from "@/util/types/ErrorComponentProps";
import {useTranslations} from "next-intl";

const ServerError: React.FC<ErrorComponentProps> = ({
                                                        title ,
                                                        fullPage = true,
                                                        children
                                                    }) => {
    const t = useTranslations("Util.Components.Error.ServerError");
    title = t("Title");
    const description = t("DefaultDescription");

    return (
        <ErrorTemplate
            icon={<LuServerCrash size={48}/>}
            title={title}
            fullPage={fullPage}
            colors={{
                text: "text-destructive",
                bg: "bg-destructive/10",
                glow: "bg-destructive",
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

export default ServerError;