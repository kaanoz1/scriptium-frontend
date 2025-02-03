import { motion } from "framer-motion";
import { LuBookX } from "react-icons/lu";
import { FC } from "react";

interface Props {
  scriptureCode: string;
}

const ScripturePageNotFoundComponent: FC<Props> = ({ scriptureCode }) => {
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
          <em className="font-bold text-red-500">404.</em> We couldn&apos;t find
          any scripture for code:{" "}
          <em className="font-bold dark:text-white">{scriptureCode}</em>
        </div>
      </div>
    </div>
  );
};

export default ScripturePageNotFoundComponent;
