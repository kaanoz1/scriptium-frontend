"use client"
import { Aref_Ruqaa } from 'next/font/google';
import { ArabicFont } from "@/fonts/Arabic/ArabicFont";

const aref = Aref_Ruqaa({ weight: ['400', '700'], subsets: ['arabic'] });

export const ArefRuqaa = new ArabicFont(
    "Aref Ruqaa",
    aref.className,
);