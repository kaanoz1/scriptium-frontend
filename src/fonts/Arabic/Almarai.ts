"use client"
import { Almarai as Almarai_Font } from 'next/font/google';
import { ArabicFont } from "@/fonts/Arabic/ArabicFont";

const almarai = Almarai_Font({ weight: ['400', '700'], subsets: ['arabic'] });

export const Almarai = new ArabicFont(
    "Almarai",
    almarai.className,
);