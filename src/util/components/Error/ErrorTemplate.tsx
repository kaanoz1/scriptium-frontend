"use client"

import React from "react";
import {motion, Variants} from "framer-motion";
import {cn} from "@/lib/utils";

export type ErrorTemplateProps = {
    icon: React.ReactNode;
    title: React.ReactNode;
    children: React.ReactNode;
    colors: {
        text: string;
        bg: string;
        glow: string;
    };
    fullPage?: boolean;
};

const containerVariants: Variants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {delayChildren: 0.15}
    }
};

const itemVariants: Variants = {
    hidden: {y: 20, opacity: 0},
    visible: {
        y: 0,
        opacity: 1,
        transition: {type: "spring", stiffness: 300, damping: 24}
    }
};

const ErrorTemplate: React.FC<ErrorTemplateProps> = ({
                                                         icon,
                                                         title,
                                                         children,
                                                         colors,
                                                         fullPage = true
                                                     }) => {
    return (
        <div className={cn(
            "relative flex flex-col items-center justify-center overflow-hidden px-6 text-center w-full",
            fullPage ? "max-h-[calc(100vh-150px)]" : "py-12 h-full min-h-100"
        )}>
            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-75 w-125 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-30 ${colors.glow}`}/>

            <motion.div
                className="flex w-full max-w-2xl flex-col items-center gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    variants={itemVariants}
                    animate={{y: [0, -10, 0]}}
                    transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
                    className={`flex h-24 w-24 items-center justify-center rounded-full ${colors.bg} ${colors.text} shadow-xl backdrop-blur-sm`}
                >
                    {icon}
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className={cn(
                        "font-extrabold tracking-tight",
                        fullPage ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
                    )}
                >
                    {title}
                </motion.h1>

                <motion.div variants={itemVariants} className="space-y-6 flex flex-col items-center">
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ErrorTemplate;