"use client"
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import { ArabicFont } from "@/fonts/Arabic/ArabicFont";

const ibmPlex = IBM_Plex_Sans_Arabic({ weight: ['400', '700'], subsets: ['arabic'] });

export const IBMPlex = new ArabicFont(
    "IBM Plex Sans",
    ibmPlex.className,
);