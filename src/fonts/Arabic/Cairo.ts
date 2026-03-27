import {ArabicFont} from "@/fonts/Arabic/ArabicFont";
import {Cairo as Cairo_Font} from 'next/font/google';

const cairo = Cairo_Font({weight: ['400', '700'], subsets: ['arabic']});


export const Cairo = new ArabicFont(
    "Cairo",
    cairo.className,
)