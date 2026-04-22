// noinspection GrazieInspectionRunner

"use client"
import { Vazirmatn as Vazirmatn_Font } from 'next/font/google';
import { ArabicFont } from "@/fonts/Arabic/ArabicFont";

const vazirmatn = Vazirmatn_Font({ subsets: ['arabic'] });

export const Vazirmatn = new ArabicFont(
    "Vazirmatn",
    vazirmatn.className,
);