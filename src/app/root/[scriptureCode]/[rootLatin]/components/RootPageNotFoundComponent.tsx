
import React from "react";
import { motion } from "framer-motion";
import { LuBookX } from "react-icons/lu";

interface Props {
  scriptureCodeParam: string;
  rootLatinParam: string;
}

const RootPageNotFoundComponent: React.FC<Props> = ({
  rootLatinParam,
  scriptureCodeParam,
}) => {
  return (
    <div className="w-full h-[calc(100vh-130px)] flex justify-center items-center">
      <div className="text-center">
        <motion.div
          className="mb-4 flex justify-center"
          animate={{ x: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, repeatDelay: 2.4 }}
        >
          <LuBookX size={96} className="text-gray-500 dark:text-white" />
        </motion.div>
        <div className="text-lg text-gray-700 dark:text-white">
          <span className="font-bold text-red-500">404.</span> We couldn&apos;t{" "}
          find root scripture for code:{" "}
          <em className="font-bold dark:text-white">{scriptureCodeParam}</em>
          and root with latin:
          <em className="font-bold dark:text-white">{rootLatinParam}</em>
        </div>
      </div>
    </div>
  );
};

export default RootPageNotFoundComponent;
