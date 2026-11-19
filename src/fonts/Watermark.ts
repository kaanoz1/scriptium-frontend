import {
  EB_Garamond,
  Frank_Ruhl_Libre,
  Noto_Serif_Devanagari,
} from "next/font/google";

export const greekSerif = EB_Garamond({
  subsets: ["greek"],
  weight: ["400"],
  display: "swap",
});

export const hebrewSerif = Frank_Ruhl_Libre({
  subsets: ["hebrew"],
  weight: ["400"],
  display: "swap",
});

export const devanagariSerif = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400"],
  display: "swap",
});
