"use client";

import { motion } from "framer-motion";
import { Link } from "@heroui/link";
import { Technology } from "./Technology";
import { FC } from "react";

type Props = {
  technology: Technology;
};

const TechnologyCard: FC<Props> = ({ technology }) => {
  const filterClass = technology.isMono() ? "dark:invert" : "";

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 p-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-black flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity duration-300"
    >
      <Link
        href={technology.getUrl()}
        isExternal
        className="block w-full h-full"
      >
        <img
          src={technology.getPath()}
          alt={technology.getName()}
          title={technology.getName()}
          className={`w-full h-full object-contain ${filterClass}`}
        />
      </Link>
    </motion.div>
  );
};

export default TechnologyCard;
