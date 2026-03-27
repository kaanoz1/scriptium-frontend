"use client"
import { Gulzar as Gulzar_Font } from 'next/font/google';
import { ArabicFont } from "@/fonts/Arabic/ArabicFont";

const gulzar = Gulzar_Font({ weight: '400', subsets: ['arabic'] });

export const Gulzar = new ArabicFont(
    "Gulzar",
    gulzar.className,
);