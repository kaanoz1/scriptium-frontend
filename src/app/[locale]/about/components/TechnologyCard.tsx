"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {Technology} from "@/util/Constants/TechnologiesUsed";

type Props = {
    technology: Technology
    className?: string
}

export const TechnologyCard: React.FC<Props> = ({ technology, className }) => {
    return (
        <Link href={technology.url} target="_blank" rel="noopener noreferrer" className={cn("block w-full h-full", className)}>
            <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="
                    flex flex-col items-center justify-center
                    p-4 h-full min-h-35
                    bg-muted/30 hover:bg-muted/80
                    border border-transparent hover:border-border
                    rounded-xl transition-all duration-150
                    text-center group
                "
            >
                <div
                    className="mb-3 text-muted-foreground transition-colors duration-150 flex items-center justify-center w-12 h-12"
                    style={{ color: 'var(--tech-color, currentColor)' }}
                >
                    {typeof technology.icon === 'string' ? (
                        <img
                            src={technology.icon}
                            alt={technology.name}
                            className="w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-150"
                        />
                    ) : (
                        <technology.icon
                            className="w-10 h-10 group-hover:text-(--hover-color) transition-colors duration-150"
                            style={{ '--hover-color': technology.color } as React.CSSProperties}
                        />
                    )}
                </div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-foreground transition-colors">{technology.name}</h3>
                <p className="text-xs text-muted-foreground px-2">
                    {technology.description}
                </p>
            </motion.div>
        </Link>
    )
}