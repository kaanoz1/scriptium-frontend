"use client"

import * as React from "react"
import {Moon, Sun} from "lucide-react"
import {AnimatePresence, motion} from "framer-motion"
import {Theme, useTheme} from "@/hooks/useTheme";
import { cn } from "@/lib/utils"; // 1. Import your cn utility

const ThemeChangeButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    // 2. Extract className and onClick from props
    ({ className, onClick, ...props }, ref) => {
        const [theme, setTheme] = useTheme();

        return (
            <button
                ref={ref}
                {...props}
                // 3. Merge the incoming classes from the Navbar with the base button classes
                className={cn(
                    "relative flex items-center justify-center outline-none cursor-pointer transition-colors",
                    className
                )}
                onClick={(e) => {
                    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
                    // Ensure any parent onClick handlers still fire
                    if (onClick) onClick(e);
                }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={theme}
                        initial={{y: -10, opacity: 0, rotate: -45}}
                        animate={{y: 0, opacity: 1, rotate: 0}}
                        exit={{y: 10, opacity: 0, rotate: 45}}
                        transition={{duration: 0.2, ease: "easeInOut"}}
                        className="flex items-center justify-center"
                    >
                        {theme === "light" ? (
                            <Sun className="h-5 w-5 text-amber-500"/>
                        ) : (
                            <Moon className="h-5 w-5 text-blue-400"/>
                        )}
                    </motion.div>
                </AnimatePresence>
                <span className="sr-only">Toggle theme</span>
            </button>
        )
    }
)

ThemeChangeButton.displayName = "ThemeChangeButton"
export default ThemeChangeButton;