"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LuBookX } from "react-icons/lu";

type Props = {
  params: string[];
};

const BookNotFound: FC<Props> = ({ params }) => {
  const path = "/" + params.join("/");

  return (
    <main className="w-full h-[calc(100vh-130px)] flex justify-center items-center">
      <div className="text-center">
        <motion.div
          className="mb-4 flex justify-center"
          animate={{ x: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, repeatDelay: 2.4 }}
        >
          <LuBookX size={96} className="text-gray-500 dark:text-white" />
        </motion.div>
        <div className="text-lg text-gray-700 dark:text-white">
          <strong className="text-red-500">404.</strong> Book not found at{" "}
          <code className="font-mono text-blue-600 dark:text-blue-400">
            {path}
          </code>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Please check the provided path and try again.
        </p>
      </div>
    </main>
  );
};

export default BookNotFound;
