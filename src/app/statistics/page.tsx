"use client";
import { Select, SelectItem } from "@heroui/select";
import { NextPage } from "next";
import { useState } from "react";
import {
  IStatisticsTemplate,
  PopularVerseStatistics,
} from "./components/class/Templates";

type Props = {};

const Statistics: NextPage<Props> = () => {
  const [selectedKey, setSelectedKey] =
    useState<TStatisticsKey>("popular/verse");

  const instance = TEMPLATE_MAP[selectedKey];
  const Template = instance.getComposedComponent();

  return (
    <div>
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

      {Template}
    </div>
  );
};

export default Statistics;

const STATISTICS_KEYS = [
  { title: "Verse most fetched", key: "popular/verse" },
  // { title: "Chapters most fetched", key: "popular/chapter" },
  // { title: "Section most fetched", key: "popular/section" },
  // { title: "Verse most saved", key: "saved/verse" },
] as const;

type TStatisticsKey = (typeof STATISTICS_KEYS)[number]["key"];

const TEMPLATE_MAP: Record<TStatisticsKey, IStatisticsTemplate<unknown>> = {
  "popular/verse": new PopularVerseStatistics(),
  // "popular/chapter": new PopularChapterStatistics(),
  // "popular/section": new PopularSectionStatistics(),
  // "saved/verse": new SavedVerseStatistics(),
};
