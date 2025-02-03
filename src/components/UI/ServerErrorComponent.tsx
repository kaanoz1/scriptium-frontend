import { NextPage } from "next";
import { motion } from "framer-motion";
import { MdOutlineError } from "react-icons/md";
interface Props {}

const ServerErrorComponent: NextPage<Props> = ({}) => {
  return (
    <main className="w-full flex justify-center items-center">
      <div className="text-center">
        <motion.div
          className="mb-4 flex justify-center"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, repeatDelay: 1.8 }}
        >
          <MdOutlineError size={96} className="text-red-600" />
        </motion.div>
        <div className="text-lg text-gray-700 dark:text-white">
          <strong className="font-bold text-red-600">500.</strong> Oops,
          something went wrong on our end. Please try again later.
        </div>
      </div>
    </main>
  );
};

export default ServerErrorComponent;
