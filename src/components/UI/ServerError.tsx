import { MdOutlineError } from "react-icons/md";
import { motion } from "framer-motion";
import { FC } from "react";

const ServerError: FC = () => {
  return (
    <main className="w-full h-[calc(100vh-130px)] flex justify-center items-center">
      <div className="text-center">
        <motion.div
          className="mb-4 flex justify-center"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, repeatDelay: 1.8 }}
        >
          <MdOutlineError size={96} className="text-red-600" />
        </motion.div>
        <div className="text-lg text-gray-700 dark:text-white">
          <span className="font-bold text-red-600">500.</span> Oops, something
          went wrong on our end. Please try again later.
        </div>
      </div>
    </main>
  );
};

export default ServerError;
