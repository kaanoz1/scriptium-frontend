"use client";

import Image from "next/image";
import MainPageSearchBar from "./MainPageSearchBar";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";

const lightImages = [
  "/images/background/light-1.png",
  "/images/background/light-2.png",
  "/images/background/light-3.png",
  "/images/background/light-4.png",
  "/images/background/light-5.png",
  "/images/background/light-6.png",
  "/images/background/light-7.png",
  "/images/background/light-8.png",
  "/images/background/light-9.png",
  "/images/background/light-10.png",
  "/images/background/light-11.png",
  "/images/background/light-12.png",
  "/images/background/light-13.png",
  "/images/background/light-14.png",
  "/images/background/light-15.png",
  "/images/background/light-16.png",
  "/images/background/light-17.png",
];

const darkImages = [
  "/images/background/dark-1.png",
  "/images/background/dark-2.png",
  "/images/background/dark-3.png",
  "/images/background/dark-4.png",
  "/images/background/dark-5.png",
  "/images/background/dark-6.png",
  "/images/background/dark-7.png",
  "/images/background/dark-8.png",
  "/images/background/dark-9.png",
  "/images/background/dark-10.png",
  "/images/background/dark-11.png",
  "/images/background/dark-12.png",
  "/images/background/dark-13.png",
  "/images/background/dark-14.png",
  "/images/background/dark-15.png",
  "/images/background/dark-16.png",
  "/images/background/dark-17.png",
  "/images/background/dark-18.png",
];

export default function SearchImageBlock() {
  const image = useRandomImageByTheme();

  return (
    <div className="relative w-full h-60 rounded-xl overflow-hidden flex flex-col items-center z-10">
      <Image
        src={image}
        alt="Background"
        fill
        className="object-cover absolute inset-0 z-0"
        priority
      />
      <div className="relative z-10 h-full max-w-3xl w-full flex items-center px-4 mt-14">
        <MainPageSearchBar />
      </div>
    </div>
  );
}

function useRandomImageByTheme(): string {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [image, setImage] = useState<string>("/images/background/light-1.png");

  useEffect(() => setMounted(true), []);

  const pool = useMemo(() => {
    if (!mounted) return lightImages;
    return resolvedTheme === "dark" ? darkImages : lightImages;
  }, [mounted, resolvedTheme]);

  useEffect(() => {
    if (!mounted) return;
    setImage((prev) => pickRandomDifferent(pool, prev));
  }, [pool, mounted]);

  return image;
}

function pickRandomDifferent(list: string[], prev?: string): string {
  if (list.length <= 1) return list[0] ?? prev ?? "";
  let next = prev;
  while (next === prev) {
    next = list[Math.floor(Math.random() * list.length)];
  }
  return next!;
}
