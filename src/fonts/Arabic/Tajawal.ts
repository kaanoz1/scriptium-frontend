"use client"
import { Tajawal as Tajawal_Font } from 'next/font/google';
import { ArabicFont } from "@/fonts/Arabic/ArabicFont";

const tajawal = Tajawal_Font({ weight: ['400', '700'], subsets: ['arabic'] });

export const Tajawal = new ArabicFont(
    "Tajawal",
    tajawal.className,
);