"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { devanagariSerif, greekSerif, hebrewSerif } from "@/fonts/Watermark";

const AR = Amiri.className;
const HE = hebrewSerif.className;
const GR = greekSerif.className;
const DV = devanagariSerif.className;

const GLYPHS: { char: string; font: string }[] = [
  { char: "ق", font: AR },
  { char: "א", font: HE },
  { char: "Ω", font: GR },
  { char: "ॐ", font: DV },
  { char: "ر", font: AR },
  { char: "ב", font: HE },
  { char: "Λ", font: GR },
  { char: "ك", font: AR },
  { char: "ש", font: HE },
  { char: "Σ", font: GR },
  { char: "ب", font: AR },
  { char: "ת", font: HE },
];

const HeroBackground = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 55% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      <div className="absolute left-1/2 top-[18%] h-72 w-[min(90vw,48rem)] -translate-x-1/2 rounded-full bg-linear-to-r from-amber-300/25 via-emerald-300/20 to-sky-300/25 blur-[100px] dark:from-amber-500/15 dark:via-emerald-500/10 dark:to-sky-500/15" />

      <motion.div
        className="absolute left-1/2 top-[38%] h-144 w-xl -translate-x-1/2 -translate-y-1/2 md:h-184 md:w-184"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border border-dashed border-foreground/[0.07]" />
        {GLYPHS.map((glyph, i) => {
          const angle = (i / GLYPHS.length) * Math.PI * 2;
          return (
            <span
              key={i}
              className={`absolute select-none text-2xl text-foreground/12 md:text-3xl ${glyph.font}`}
              style={{
                left: `${50 + 50 * Math.cos(angle)}%`,
                top: `${50 + 50 * Math.sin(angle)}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {glyph.char}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HeroBackground;
