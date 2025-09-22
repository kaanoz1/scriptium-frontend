"use client";
import { Select, SelectItem } from "@heroui/select";
import { NextPage } from "next";
import { FC, useState } from "react";
import {
  IStatisticsTemplate,
  PopularFetchedChapterStatistics,
  PopularFetchedSectionStatistics,
  PopularFetchedVerseStatistics,
} from "./components/class/Templates";
import { motion } from "framer-motion";

type Props = {};

const Main: NextPage<Props> = () => {
  const [selectedKey, setSelectedKey] = useState<TStatisticsKey>(
    "verse/popular/fetched"
  );

  const instance = TEMPLATE_MAP[selectedKey];

  const templateTitle = instance.getTitle();

  const Template = instance.getComposedComponent();

  return (
    <div className="w-full py-6 px-4 sm:px-8 lg:px-16 flex flex-col gap-6 items-center text-center bg-white text-black dark:bg-black dark:text-white">
      <Title />

      <Description />

      <div className="w-full max-w-md">
        <Select
          label="Select an option to see statistics of"
          selectedKeys={new Set([selectedKey])}
          onSelectionChange={(keys) =>
            setSelectedKey(Array.from(keys)[0] as TStatisticsKey)
          }
          selectionMode="single"
        >
          {STATISTICS_KEYS.map((s) => (
            <SelectItem key={s.key}>{s.title}</SelectItem>
          ))}
        </Select>
      </div>

      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
        {templateTitle}
      </p>

      <div className="w-full max-w-8xl mt-6">{Template}</div>
    </div>
  );
};

export default Main;

const STATISTICS_KEYS = [
  { title: "Verse most fetched", key: "verse/popular/fetched" },
  { title: "Chapters most fetched", key: "chapter/popular/fetched" },
  { title: "Section most fetched", key: "section/popular/fetched" },
] as const;

type TStatisticsKey = (typeof STATISTICS_KEYS)[number]["key"];

const TEMPLATE_MAP: Record<TStatisticsKey, IStatisticsTemplate<unknown>> = {
  "verse/popular/fetched": new PopularFetchedVerseStatistics(),
  "chapter/popular/fetched": new PopularFetchedChapterStatistics(),
  "section/popular/fetched": new PopularFetchedSectionStatistics(),
};

const Title: FC = () => {
  return (
    <motion.h3
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200"
    >
      Statistics of Scriptium
    </motion.h3>
  );
};

const Description: FC = () => {
  return (
    <motion.h5
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl"
    >
      Choose from the categories below to explore the most popular verses,
      chapters, or sections based on user interactions. You can customize the
      data range and entity count for a more tailored view.
    </motion.h5>
  );
};
