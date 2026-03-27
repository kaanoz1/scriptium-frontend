"use client"
import {Amiri as Amiri_Font} from 'next/font/google';
import {ArabicFont} from "@/fonts/Arabic/ArabicFont";


const amiri = Amiri_Font({weight: ['400', '700'], subsets: ['arabic']});


export const Amiri =   new ArabicFont(
    "Amiri",
    amiri.className,
);