"use client";
import { T_NoAuthenticationRequestErrorCode } from "@/types/response";
import {
  isNoAuthenticationRequestErrorCode,
  PROJECT_NAME,
} from "@/util/constants";
import { getErrorComponent } from "@/util/reactUtil";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { fetchBooks } from "./utils/function";
import { motion, Variants } from "framer-motion";
import BreadCrumbs from "./components/BreadCrumbs";
import Book from "./components/Book";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import { BookCover } from "@/types/classes/model/Book/Book/BookCover/BookCover";

const Main: NextPage = () => {
  const { data: books = null, isLoading } = useQuery<
    Array<BookCover> | T_NoAuthenticationRequestErrorCode
  >({
    queryKey: ["book"],
    queryFn: fetchBooks,
  });

  if (isLoading) return <LoadingSpinnerFullHeight />;

  if (books === null || isNoAuthenticationRequestErrorCode(books))
    return getErrorComponent();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white dark:bg-black pt-6 pb-16 min-h-[calc(100vh-130px)]"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center sm:block">
        <div className="my-4">
          <BreadCrumbs />
        </div>

        <motion.h1
          className="text-center text-3xl py-5 font-bold mb-4 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Books
        </motion.h1>

        <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8 italic">
          All books that {PROJECT_NAME} has listed. Click on one to get more
          information.
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={BOOKS_WRAPPER_VARIANTS}
        >
          {books.map((book, i) => (
            <Book key={`book-${i}`} book={book} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Main;

const BOOKS_WRAPPER_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.038,
    },
  },
};
