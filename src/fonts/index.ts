// noinspection JSUnusedGlobalSymbols

import { Inter, Instrument_Serif, Outfit, Space_Grotesk, Syne } from 'next/font/google';
export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['700'],
    display: 'swap',
    variable: '--font-space',
});

export const instrumentSerif = Instrument_Serif({
    subsets: ['latin'],
    weight: ['400'],
    style: ['italic', 'normal'],
    display: 'swap',
    variable: '--font-instrument',
});

export const outfit = Outfit({
    subsets: ['latin'],
    weight: ['600', '700'],
    display: 'swap',
    variable: '--font-outfit',
});

export const syne = Syne({
    subsets: ['latin'],
    weight: ['500'],
    display: 'swap',
    variable: '--font-syne',
});