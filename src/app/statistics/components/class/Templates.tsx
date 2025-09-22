import { Response, T_NoAuthenticationRequestErrorCode } from "@/types/response";
import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { NumberInput } from "@heroui/number-input";
import { Slider } from "@heroui/slider";
import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";

import { DailyStatistics } from "@/types/interface/DailyStatistics";
import {
  OK_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  isNoAuthenticationRequestErrorCode,
  DEFAULT_LANG_CODE,
} from "@/util/constants";
import { addToast } from "@heroui/toast";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getErrorComponent } from "@/util/reactUtil";

import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import {
  ChapterUpperMean,
  T_ChapterUpperMeanConstructorParametersJSON,
} from "@/types/classes/model/Chapter/ChapterMean/ChapterUpperMean/ChapterUpperMean";
import {
  SectionUpperMean,
  T_SectionUpperMeanConstructorParametersJSON,
} from "@/types/classes/model/Section/SectionMean/SectionUpperMean/SectionUpperMean";
import {
  VerseUpperMean,
  T_VerseUpperMeanConstructorParametersJSON,
} from "@/types/classes/model/Verse/VerseMean/VerseUpperMean/VerseUpperMean";

export interface IStatisticsTemplate<T> {
  key: string;
  title: string;
  queryKey: QueryKey;
  queryFunction: QueryFunction<T | T_NoAuthenticationRequestErrorCode>;

  getTemplate(): ({
    chart,
    countValue,
    dayRange,
    setCountValue,
    setDayRange,
  }: TemplateProps) => ReactNode;

  getChart(data: T, countValue: number, dayRange: number[]): ReactNode;

  getTitle(): string;

  getComposedComponent(): ReactNode;
}

export abstract class PopularTemplate<T>
  implements IStatisticsTemplate<Array<DailyStatistics<T>>>
{
  abstract key: string;
  abstract title: string;
  abstract queryKey: readonly unknown[];
  abstract queryFunction: QueryFunction<
    Array<DailyStatistics<T>> | T_NoAuthenticationRequestErrorCode
  >;

  getTitle(): string {
    return this.title;
  }

  getQueryKey() {
    return this.queryKey;
  }

  getQueryFunction() {
    return this.queryFunction;
  }

  getChart(
    data: Array<DailyStatistics<T>>,
    countValue: number,
    dayRange: number[]
  ): ReactNode {
    const start = dayRange.at(0) ?? 0;
    const end = dayRange.at(1) ?? 365;

    const filteredData = data
      .map((item) => {
        const entries = Object.entries(item.dayDictionary);
        const filtered = entries.filter(([date]) => {
          const dateNum = new Date(date).getTime();
          const today = Date.now();
          const diffDays = Math.floor(
            (today - dateNum) / (1000 * 60 * 60 * 24)
          );
          return diffDays >= start && diffDays <= end;
        });

        const count = filtered.reduce((sum, [, val]) => sum + val, 0);

        const name = this.getName(item.data);

        return new Entry(name, count);
      })
      .filter((e) => e.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, countValue);

    const colors = filteredData.map(
      () =>
        `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")}`
    );

    return (
      <ResponsiveContainer width="100%" height={720}>
        <BarChart
          data={filteredData}
          margin={{ top: 20, right: 30, left: 30, bottom: 200 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            type="category"
            interval={0}
            angle={-45}
            textAnchor="end"
          />
          <YAxis type="number" />
          <Tooltip />
          <Bar dataKey="count">
            {filteredData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  getTemplate(): ({
    chart,
    countValue,
    dayRange,
    setCountValue,
    setDayRange,
  }: TemplateProps) => ReactNode {
    return ({ chart, countValue, dayRange, setCountValue, setDayRange }) => {
      return (
        <div className="flex flex-col gap-6">
          <div className="flex justify-items-center items-center gap-4 mb-6">
            <NumberInput
              value={countValue}
              onValueChange={setCountValue}
              label="Number of items"
              placeholder="Enter count (1-100)"
              description="Controls how many data items appear in the chart."
              min={1}
              max={100}
              className="flex-1"
            />

            <Slider
              label="Day range filter"
              defaultValue={[0, 365]}
              value={dayRange}
              step={1}
              minValue={0}
              maxValue={365}
              className="flex-1"
              classNames={{
                base: "text-black dark:text-white",
                track: "bg-gray-300 dark:bg-zinc-800",
                thumb:
                  "bg-black dark:bg-white border border-gray-500 dark:border-gray-300",
                label: "text-gray-800 dark:text-gray-200",
              }}
              onChangeEnd={setDayRange}
            />
          </div>
          <div className="w-full">{chart}</div>
        </div>
      );
    };
  }

  getComposedComponent(): ReactNode {
    const [countValue, setCountValue] = useState<number>(100);
    const [dayRange, setDayRange] = useState<number[] | number>([0, 365]);

    const queryKey = this.getQueryKey();
    const queryFn = this.getQueryFunction();

    const { data = null, isLoading } = useQuery<
      Array<DailyStatistics<T>> | T_NoAuthenticationRequestErrorCode
    >({
      queryKey,
      queryFn,
    });

    if (isLoading) return <LoadingSpinnerFullHeight />;

    if (data === null || isNoAuthenticationRequestErrorCode(data))
      return getErrorComponent();

    const chart = this.getChart(
      data,
      countValue,
      Array.isArray(dayRange) ? dayRange : [dayRange]
    );

    const Template = this.getTemplate();

    return (
      <Template
        chart={chart}
        countValue={countValue}
        dayRange={dayRange}
        setCountValue={setCountValue}
        setDayRange={setDayRange}
      />
    );
  }

  abstract getName(data: T): string;
}

export class PopularFetchedVerseStatistics extends PopularTemplate<VerseUpperMean> {
  override key: string;
  override title: string;
  override queryKey: readonly unknown[];
  override queryFunction: QueryFunction<
    T_NoAuthenticationRequestErrorCode | Array<DailyStatistics<VerseUpperMean>>
  >;

  constructor() {
    super();
    this.key = "verse/popular/fetched";
    this.title =
      "This chart shows most demanded verse from our databases. You change the range of the days or alter the number of verses shown to get more certain view.";
    this.queryKey = [this.key];
    this.queryFunction = async () => {
      try {
        const url: string = ["statistics", ...this.key.split("/")].join("/");

        const response = await axiosNoCredentialInstance.get<
          Response<
            Array<DailyStatistics<T_VerseUpperMeanConstructorParametersJSON>>
          >
        >(url);

        if (response.status === OK_HTTP_RESPONSE_CODE)
          return response.data.data.map(
            (e) =>
              new DailyStatistics<VerseUpperMean>(
                VerseUpperMean.createFromJSON(e.data),
                e.dayDictionary
              )
          );

        throw new Error("Unexpected result");
      } catch (error) {
        if (!axios.isAxiosError(error)) {
          console.error(error);
          addToast({
            title: "Unknown error",
            description: "An unexpected error occurred.",
            color: "danger",
          });
          return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
        }

        if (error.code === "ERR_NETWORK") {
          console.error(error);
          addToast({
            title: "Network Error",
            description: "Check your internet connection and try again.",
            color: "warning",
          });
          return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
        }

        const status = error.response?.status;

        switch (status) {
          case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
            addToast({
              title: "Too many requests",
              description: "Slow down and try again later.",
              color: "warning",
            });
            return status;

          default:
            console.error(error);
            addToast({
              title: "Unexpected error",
              description:
                "Something went wrong while deleting the note. Check console for more details.",
              color: "warning",
            });
            return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
        }
      }
    };
  }

  override getName(data: VerseUpperMean): string {
    const verse = data;
    const chapter = verse.getChapter();
    const section = chapter.getSection();
    const scripture = section.getScripture();

    const scriptureMeaning =
      scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
    const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
    const chapterNumber = chapter.getNumber();
    const verseNumber = verse.getNumber();

    return `${scriptureMeaning}, ${sectionMeaning}, ${chapterNumber}, Verse: ${verseNumber}`;
  }
}

export class PopularFetchedChapterStatistics extends PopularTemplate<ChapterUpperMean> {
  override key: string;
  override title: string;
  override queryKey: readonly unknown[];
  override queryFunction: QueryFunction<
    | T_NoAuthenticationRequestErrorCode
    | Array<DailyStatistics<ChapterUpperMean>>
  >;

  constructor() {
    super();
    this.key = "chapter/popular/fetched";
    this.title =
      "This chart shows most demanded chapter from our databases. You change the range of the days or alter the number of chapter shown to get more certain view.";
    this.queryKey = [this.key];
    this.queryFunction = async () => {
      try {
        const url: string = ["statistics", ...this.key.split("/")].join("/");

        const response = await axiosNoCredentialInstance.get<
          Response<
            Array<DailyStatistics<T_ChapterUpperMeanConstructorParametersJSON>>
          >
        >(url);

        if (response.status === OK_HTTP_RESPONSE_CODE)
          return response.data.data.map(
            (e) =>
              new DailyStatistics<ChapterUpperMean>(
                ChapterUpperMean.createFromJSON(e.data),
                e.dayDictionary
              )
          );

        throw new Error("Unexpected result");
      } catch (error) {
        if (!axios.isAxiosError(error)) {
          console.error(error);
          addToast({
            title: "Unknown error",
            description: "An unexpected error occurred.",
            color: "danger",
          });
          return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
        }

        if (error.code === "ERR_NETWORK") {
          console.error(error);
          addToast({
            title: "Network Error",
            description: "Check your internet connection and try again.",
            color: "warning",
          });
          return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
        }

        const status = error.response?.status;

        switch (status) {
          case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
            addToast({
              title: "Too many requests",
              description: "Slow down and try again later.",
              color: "warning",
            });
            return status;

          default:
            console.error(error);
            addToast({
              title: "Unexpected error",
              description:
                "Something went wrong while fetching the data. Check console for more details.",
              color: "warning",
            });
            return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
        }
      }
    };
  }

  override getName(data: ChapterUpperMean): string {
    const chapter = data;
    const section = data.getSection();
    const scripture = section.getScripture();

    const scriptureMeaning =
      scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
    const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
    const chapterNumber = chapter.getNumber();

    return `${scriptureMeaning}, ${sectionMeaning}, Chapter: ${chapterNumber}`;
  }
}

export class PopularFetchedSectionStatistics extends PopularTemplate<SectionUpperMean> {
  override key: string;
  override title: string;
  override queryKey: readonly unknown[];
  override queryFunction: QueryFunction<
    | T_NoAuthenticationRequestErrorCode
    | Array<DailyStatistics<SectionUpperMean>>
  >;

  constructor() {
    super();
    this.key = "section/popular/fetched";
    this.title =
      "This chart shows most demanded section from our databases. You change the range of the days or alter the number of section shown to get more certain view.";
    this.queryKey = [this.key];
    this.queryFunction = async () => {
      try {
        const url: string = ["statistics", ...this.key.split("/")].join("/");

        const response = await axiosNoCredentialInstance.get<
          Response<
            Array<DailyStatistics<T_SectionUpperMeanConstructorParametersJSON>>
          >
        >(url);

        if (response.status === OK_HTTP_RESPONSE_CODE)
          return response.data.data.map(
            (e) =>
              new DailyStatistics<SectionUpperMean>(
                SectionUpperMean.createFromJSON(e.data),
                e.dayDictionary
              )
          );

        throw new Error("Unexpected result");
      } catch (error) {
        if (!axios.isAxiosError(error)) {
          console.error(error);
          addToast({
            title: "Unknown error",
            description: "An unexpected error occurred.",
            color: "danger",
          });
          return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
        }

        if (error.code === "ERR_NETWORK") {
          console.error(error);
          addToast({
            title: "Network Error",
            description: "Check your internet connection and try again.",
            color: "warning",
          });
          return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
        }

        const status = error.response?.status;

        switch (status) {
          case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
            addToast({
              title: "Too many requests",
              description: "Slow down and try again later.",
              color: "warning",
            });
            return status;

          default:
            console.error(error);
            addToast({
              title: "Unexpected error",
              description:
                "Something went wrong while fetching the data. Check console for more details.",
              color: "warning",
            });
            return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
        }
      }
    };
  }

  override getName(data: SectionUpperMean): string {
    const section = data;
    const scripture = section.getScripture();

    const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
    const scriptureMeaning =
      scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

    return `${scriptureMeaning}, ${sectionMeaning}`;
  }
}

export class PopularSavedVerseStatistics extends PopularTemplate<VerseUpperMean> {
  override key: string;
  override title: string;
  override queryKey: readonly unknown[];
  override queryFunction: QueryFunction<
    T_NoAuthenticationRequestErrorCode | Array<DailyStatistics<VerseUpperMean>>
  >;

  constructor() {
    super();
    this.key = "verse/popular/saved";
    this.title =
      "This chart shows most saved verses across the users. You change the range of the days or alter the number of verse shown to get more certain view.";
    this.queryKey = [this.key];
    this.queryFunction = async () => {
      try {
        const url: string = ["statistics", ...this.key.split("/")].join("/");

        const response = await axiosNoCredentialInstance.get<
          Response<
            Array<DailyStatistics<T_VerseUpperMeanConstructorParametersJSON>>
          >
        >(url);

        if (response.status === OK_HTTP_RESPONSE_CODE)
          return response.data.data.map(
            (e) =>
              new DailyStatistics<VerseUpperMean>(
                VerseUpperMean.createFromJSON(e.data),
                e.dayDictionary
              )
          );

        throw new Error("Unexpected result");
      } catch (error) {
        if (!axios.isAxiosError(error)) {
          console.error(error);
          addToast({
            title: "Unknown error",
            description: "An unexpected error occurred.",
            color: "danger",
          });
          return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
        }

        if (error.code === "ERR_NETWORK") {
          console.error(error);
          addToast({
            title: "Network Error",
            description: "Check your internet connection and try again.",
            color: "warning",
          });
          return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
        }

        const status = error.response?.status;

        switch (status) {
          case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
            addToast({
              title: "Too many requests",
              description: "Slow down and try again later.",
              color: "warning",
            });
            return status;

          default:
            console.error(error);
            addToast({
              title: "Unexpected error",
              description:
                "Something went wrong while fetching the data. Check console for more details.",
              color: "warning",
            });
            return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
        }
      }
    };
  }

  override getName(data: VerseUpperMean): string {
    const verse = data;
    const chapter = verse.getChapter();
    const section = chapter.getSection();
    const scripture = section.getScripture();

    const scriptureMeaning =
      scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
    const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
    const chapterNumber = chapter.getNumber();
    const verseNumber = verse.getNumber();

    return `${scriptureMeaning}, ${sectionMeaning}, ${chapterNumber}, Verse: ${verseNumber}`;
  }
}

type TemplateProps = {
  chart: ReactNode;
  countValue: number;
  dayRange: number[] | number;
  setCountValue: (val: number) => void;
  setDayRange: Dispatch<SetStateAction<number | number[]>>;
};

class Entry {
  public name: string; // Because Recharts get them by key fetch e.g obj["name"]
  public count: number;

  constructor(name: string, count: number) {
    this.name = name;
    this.count = count;
  }
}
