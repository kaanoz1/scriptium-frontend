"use client";

import {useTheme as useThemeNatural} from "next-themes";

export enum Theme {
    LIGHT = "light",
    DARK = "dark"
}

export const useTheme = () => {
    const {theme: themeNatural, setTheme: setThemeNatural} = useThemeNatural();

    const theme = themeNatural === "dark" ? Theme.DARK : Theme.LIGHT;

    const setTheme = (newTheme: Theme) => setThemeNatural(newTheme)

    return [theme, setTheme] as const;
};