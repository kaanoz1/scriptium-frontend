"use client"
import {Reem_Kufi} from "next/font/google";
import {ArabicFont} from "@/fonts/Arabic/ArabicFont";

const reem = Reem_Kufi({weight: ['400', '700'], subsets: ['arabic']});

export const Reem = new ArabicFont(
    "Reem Kufi",
    reem.className,
);