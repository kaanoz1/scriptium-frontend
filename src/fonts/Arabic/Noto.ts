import {ArabicFont} from "@/fonts/Arabic/ArabicFont";
import {Noto_Sans_Arabic} from "next/font/google";

const noto = Noto_Sans_Arabic({weight: ['400', '700'], subsets: ['arabic']});
export const Noto = new ArabicFont(
    "Noto Sans Arabic",
    noto.className,
);