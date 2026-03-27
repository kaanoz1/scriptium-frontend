"use client"
import { Readex_Pro } from 'next/font/google';
import { ArabicFont } from "@/fonts/Arabic/ArabicFont";

const readex = Readex_Pro({ subsets: ['arabic'] });

export const ReadexPro = new ArabicFont(
    "Readex Pro",
    readex.className,
);