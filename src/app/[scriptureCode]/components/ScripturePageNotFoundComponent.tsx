"use client";
import { motion } from "framer-motion";
import { LuBookX } from "react-icons/lu";
import { FC } from "react";

interface Props {
  scriptureCodeParam: string;
}

const ScripturePageNotFoundComponent: FC<Props> = ({ scriptureCodeParam }) => {
  return (
    <main
      className="w-full min-h-[60vh] sm:min-h-[calc(100vh-130px)] flex justify-center items-center px-6 sm:px-8"
      aria-labelledby="notfound-title"
    >
      <h1 className="sr-only">Scripture Not Found</h1>
      <div className="text-center max-w-screen-md">
        <motion.div
          className="mb-4 flex justify-center"
          animate={{ x: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, repeatDelay: 2.4 }}
        >
          <LuBookX className="text-gray-500 dark:text-white w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24" />
        </motion.div>
        <div className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-white leading-relaxed">
          <em className="font-bold text-red-500">404.</em> We couldn&apos;t find
          any scripture for code:{" "}
          <em className="font-bold dark:text-white break-words hyphens-auto">
            {scriptureCodeParam}
          </em>
        </div>
      </div>
    </main>
  );
};

export default ScripturePageNotFoundComponent;
