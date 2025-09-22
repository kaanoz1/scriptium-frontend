"use client";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { T_NoAuthenticationRequestErrorCode } from "@/types/response";
import {
  DEFAULT_LANG_CODE,
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { getErrorComponent } from "@/util/reactUtil";
import BookNotFound from "../../../components/book/BookNotFound";
import { motion } from "framer-motion";
import BookPartBox from "./components/BookPartBox";
import BreadCrumbs from "./components/BreadCrumbs";
import { fetchBookAndNodes } from "./utils/functions";
import { BOOK_PARTS_WRAPPER_VARIANT } from "./utils/constants";
import { T_BookMeaningPageRouteParams } from "./utils/types";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import { BookCoverOneLevelLower } from "@/types/classes/model/Book/Book/BookCover/BookCoverOneLevelLower/BookCoverOneLevelLower";

const Main: NextPage = () => {
  const { bookMeaning: bookMeaningRouteParam } =
    useParams<T_BookMeaningPageRouteParams>();

  const params = [bookMeaningRouteParam];

  const { data: book = null, isLoading } = useQuery<
    BookCoverOneLevelLower | T_NoAuthenticationRequestErrorCode
  >({
    queryKey: ["book", ...params],
    queryFn: async () => fetchBookAndNodes(bookMeaningRouteParam),
  });

  if (isLoading) return <LoadingSpinnerFullHeight />;

  if (book === null || isNoAuthenticationRequestErrorCode(book))
    return getErrorComponent({
      code: book,
      preferredErrorComponent: {
        [NOT_FOUND_HTTP_RESPONSE_CODE]: <BookNotFound params={params} />,
      },
    });

  const nodes = book.getNodes();

  const description = book.getDescription();

  const bookMeaning = book.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const bookName = book.getName();
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white dark:bg-black pt-6 pb-16 min-h-[calc(100vh-130px)]"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center sm:block">
        <BreadCrumbs book={book} />
        <motion.h1
          className="text-center text-3xl py-5 font-bold mb-4 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {bookMeaning} ({bookName})
        </motion.h1>

        {description && (
          <motion.h3
            className="text-center text-xl py-5 font-thin mb-4 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {description}
          </motion.h3>
        )}

        <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Select a part to read.
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={BOOK_PARTS_WRAPPER_VARIANT}
        >
          {nodes.map((node, i) => (
            <BookPartBox key={i} book={book} bookNode={node} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Main;
