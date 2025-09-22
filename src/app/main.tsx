"use client";

import { useState } from "react";
import UIWrapper from "@/components/UI/UIWrapper";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import SearchImageBlock from "../components/main/RandomImage";
import BookBox from "../components/main/BookBox";

const AnimationBackground = dynamic(
  () =>
    import("@/components/main/AnimationalBackground").then(
      (m) => m.AnimationBackground
    ),
  { ssr: false }
);

export default function Home() {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <UIWrapper>
      <AnimationBackground isActive={isActive} />
      <div className="bg-white dark:bg-dark px-3 sm:px-4 lg:px-6 py-4 flex flex-col items-center text-gray-900 dark:text-gray-100">
        <div className="w-full max-w-7xl flex flex-col gap-6 sm:gap-8 items-center">
          <SearchImageBlock />

          <nav
            className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base md:text-lg font-medium text-gray-700 dark:text-gray-300"
            aria-label="Primary"
          />
        </div>

        <section className="mt-10 md:mt-16 text-center w-full max-w-6xl">
          <div className="w-full flex flex-col gap-4 sm:gap-6 items-center justify-center">
            <div className="w-full flex justify-center items-center">
              <div className="w-full max-w-md">
                <BookBox
                  onMouseEnter={() => setIsActive(true)}
                  onMouseLeave={() => setIsActive(false)}
                  href="/t"
                  heading="Torah"
                  headingOwnLanguage="תּוֹרָה"
                  headingDescription="The holy Scripture of Judaism"
                  informationHref="https://en.wikipedia.org/wiki/Torah"
                  informationTitle="What is Torah?"
                />
              </div>
            </div>

            <motion.div
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
              variants={{
                hidden: { opacity: 0, scale: 0.98 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { staggerChildren: 0.038 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="w-full">
                <BookBox
                  onMouseEnter={() => setIsActive(true)}
                  onMouseLeave={() => setIsActive(false)}
                  href="/books/Mishnah"
                  heading="Mishnah"
                  headingOwnLanguage="מִשְׁנָה"
                  headingDescription="Descriptive discussion of Torah"
                  informationHref=""
                  informationTitle="What is Mishnah?"
                />
              </div>

              <div className="w-full">
                <BookBox
                  onMouseEnter={() => setIsActive(true)}
                  onMouseLeave={() => setIsActive(false)}
                  href="/books/Talmud"
                  heading="Talmud"
                  headingOwnLanguage="תלמוד"
                  headingDescription="Descriptive discussion of Talmud"
                  informationHref=""
                  informationTitle="What is Talmud?"
                />
              </div>

              <div className="w-full">
                <BookBox
                  onMouseEnter={() => setIsActive(true)}
                  onMouseLeave={() => setIsActive(false)}
                  href="/books/Midrash"
                  heading="Midrash"
                  headingOwnLanguage="מדרש‎"
                  headingDescription="Descriptive discussion of Midrash"
                  informationHref=""
                  informationTitle="What is Midrash?"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </UIWrapper>
  );
}
