import { TbTrafficCone } from "react-icons/tb";
import { motion } from "framer-motion";
import { FC } from "react";

const TooManyRequestComponent: FC = ({}) => {
  return (
    <main className="w-full flex justify-center items-center">
      <div className="text-center">
        <motion.div
          className="mb-4 flex justify-center"
          animate={{ y: [0, -5, 0], rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, repeatDelay: 2 }}
        >
          <TbTrafficCone size={96} className="text-yellow-500" />
        </motion.div>
        <div className="text-lg text-gray-700 dark:text-white">
          <span className="font-bold text-yellow-500">429.</span> {"You're"}{" "}
          making too many requests. Please slow down and try again later.
        </div>
      </div>
    </main>
  );
};

export default TooManyRequestComponent;
