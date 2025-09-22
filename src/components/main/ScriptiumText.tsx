"use client";

import {
  alexBrush,
  allura,
  dancingScript,
  greatVibes,
  italianno,
  kaushan,
  mrDeHaviland,
  parisienne,
  petitFormal,
  pinyonScript,
  rougeScript,
  tangerine,
} from "@/fonts";
import { FC, useMemo } from "react";

const fonts = [
  greatVibes,
  parisienne,
  dancingScript,
  kaushan,
  allura,
  alexBrush,
  pinyonScript,
  italianno,
  rougeScript,
  mrDeHaviland,
  petitFormal,
  tangerine,
];

const ScriptiumText: FC = () => {
  const font = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * fonts.length);
    return fonts[randomIndex];
  }, []);

  return (
    <h1
      className={`${
        font ? font.className : ""
      } text-3xl md:text-4xl text-center text-gray-900 dark:text-white transition-all duration-500 px-2`}
    >
      Scriptium
    </h1>
  );
};

export default ScriptiumText;
