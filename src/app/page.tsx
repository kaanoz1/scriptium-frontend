"use client";

import SearchBar from "@/components/UI/SearchBar";
import UIWrapper from "@/components/UI/UIWrapper";
import { PROJECT_NAME, TOOL_TIP_CLASS_NAMES } from "@/util/utils";
import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/tooltip";
import { useState, useEffect, useRef } from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";

export default function Home() {
  const [displayedName, setDisplayedName] = useState("");
  const currentIndex = useRef(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex.current < PROJECT_NAME.length) {
        setDisplayedName(
          (prev) => prev + PROJECT_NAME.charAt(currentIndex.current)
        );
        currentIndex.current++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <UIWrapper>
      <div className="flex flex-col items-center justify-start bg-white dark:bg-dark p-6">
        <main className="relative text-center mt-6 mb-6">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-widest text-gray-800 whitespace-nowrap border-r-4 border-gray-800 pr-4 dark:text-white">
            {displayedName}
          </h1>
        </main>

        <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 items-center mt-4 mb-6">
          <SearchBar />

          <div className="flex gap-6 text-gray-700 dark:text-white">
            <Link
              href="/about"
              className="hover:underline text-base md:text-lg font-medium "
            >
              What is {PROJECT_NAME}?
            </Link>

            <Tooltip
              offset={25}
              delay={250}
              closeDelay={5}
              placement="bottom"
              classNames={TOOL_TIP_CLASS_NAMES}
              content={
                <div className="flex flex-col gap-2">
                  <span>
                    There is a format for querying which {PROJECT_NAME}{" "}
                    recognizes.
                  </span>
                  <div>Examples:</div>
                  <div className="ps-5">
                    <div className="flex flex-col gap-2">
                      <span>
                        {" "}
                        t 1 1 1 =&gt; Torah, Section 1, Chapter 1, Verse 1.
                      </span>
                      <span>
                        {" "}
                        t/2/3/19 =&gt; Torah, Section 2, Chapter 3, Verse 19.
                      </span>
                      <span>
                        t:28/31.30 =&gt; Torah, Section 28, Chapter 31, Verse
                        30.
                      </span>
                    </div>
                  </div>
                  <div>
                    Valid separators are : . , | \ / = - (or whitespace).
                  </div>
                  <div>
                    Otherwise, the server will search for the most relevant
                    verses.
                  </div>
                </div>
              }
            >
              <span className="flex items-center gap-1 cursor-pointer text-blue-500 hover:underline">
                How to query? <HiQuestionMarkCircle size={19} />
              </span>
            </Tooltip>
          </div>
        </div>

        <div className="text-center text-lg font-semibold text-gray-700">
          <p className="mb-6 dark:text-white">
            Click to read one of the Scriptures:
          </p>
          <div className="flex gap-6">
            <Link
              href="/t"
              className="bg-white dark:bg-dark shadow-md hover:shadow-xl rounded-md flex flex-col items-center justify-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 border border-gray-300 p-2"
            >
              <div className="flex flex-col items-center p-6 gap-1">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  Torah
                </span>
                <p className="text-2xl text-gray-500 dark:text-white">
                  תּוֹרָה
                </p>

                <p className="text-sm text-gray-500 dark:text-white">
                  The holy Scripture of Judaism
                </p>
                <div>
                  <Link
                    href="https://en.wikipedia.org/wiki/Torah"
                    isExternal
                    showAnchorIcon
                  >
                    What is Torah?
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </UIWrapper>
  );
}
