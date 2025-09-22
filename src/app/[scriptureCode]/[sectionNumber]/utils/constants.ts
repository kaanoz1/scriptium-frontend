"use client";

import { Variants } from "framer-motion";

export const CHAPTER_WRAPPER_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.019,
    },
  },
};
