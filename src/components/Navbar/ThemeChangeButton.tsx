"use client"

import * as React from "react"
import {Moon, Sun} from "lucide-react"
import {AnimatePresence, motion} from "framer-motion"
import {Theme, useTheme} from "@/hooks/useTheme";

const ThemeChangeButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    (props, ref) => {
        const [theme, setTheme] = useTheme();

        return (
            <button
                ref={ref}
                {...props}
                onClick={(e) => {
                    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
                    props.onClick?.(e);
                }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={theme}
                        initial={{ y: -20, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 20, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="flex items-center justify-center"
                    >
                        {theme === "light" ? (
                            <Sun className="h-5 w-5 text-amber-500" />
                        ) : (
                            <Moon className="h-5 w-5 text-blue-400" />
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