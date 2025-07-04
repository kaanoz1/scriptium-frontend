import { Response, T_NoAuthenticationRequestErrorCode } from "@/types/response";
import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { NumberInput } from "@heroui/number-input";
import { Slider } from "@heroui/slider";
import axiosNoCredentialInstance from "@/client/axiosNoCredentialInstance";
import {
  VerseUpperMeanDTO,
  T_VerseUpperMeanDTOConstructorParametersJSON,
} from "@/types/classes/Verse";
import { DailyStatistics } from "@/types/interface/DailyStatistics";
import {
  OK_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  DEFAULT_LANG_CODE,
  isNoAuthenticationRequestErrorCode,
} from "@/util/constants";
import { addToast } from "@heroui/toast";
import axios from "axios";
import path from "path";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { getErrorComponent } from "@/util/reactUtil";

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

  getComposedComponent(): ReactNode;
}

export abstract class PopularTemplate<T> implements IStatisticsTemplate<T> {
  abstract key: string;
  abstract title: string;
  abstract queryKey: readonly unknown[];
  abstract queryFunction: QueryFunction<T | T_NoAuthenticationRequestErrorCode>;

  getTitle(): string {
    return this.title;
  }

  getQueryKey() {
    return this.queryKey;
  }

  getQueryFunction() {
    return this.queryFunction;
  }

  abstract getChart(data: T, countValue: number, dayRange: number[]): ReactNode;

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberInput
              label="Count of entities to show"
              value={countValue}
              onValueChange={setCountValue}
              max={100}
              min={1}
            />
            <Slider
              className="max-w-md"
              label="Day range"
              maxValue={365}
              minValue={0}
              step={1}
              value={dayRange}
              onChangeEnd={setDayRange}
            />
          </div>
          <div className="w-full h-[400px]">{chart}</div>
        </div>
      );
    };
  }

  getComposedComponent(): ReactNode {
    const [countValue, setCountValue] = useState<number>(100);
    const [dayRange, setDayRange] = useState<number[] | number>([0, 365]);

    const queryKey = this.getQueryKey();
    const queryFn = this.getQueryFunction();

    const { data = null } = useQuery<T | T_NoAuthenticationRequestErrorCode>({
      queryKey,
      queryFn,
    });

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
}

export class PopularVerseStatistics extends PopularTemplate<
  Array<DailyStatistics<VerseUpperMeanDTO>>
> {
  override getChart(
    data: DailyStatistics<VerseUpperMeanDTO>[],
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
        const verse = item.data;
        const chapter = verse.getChapter();
        const section = chapter.getSection();
        const scripture = section.getScripture();

        const verseNumber = verse.getNumber();
        const chapterNumber = chapter.getNumber();
        const sectionMeaning =
          section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
        const scriptureMeaning =
          scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
        const name = `${scriptureMeaning}, ${sectionMeaning}, ${chapterNumber}:${verseNumber}`;

        return { name, count };
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
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={filteredData}
          margin={{ top: 20, right: 30, left: 30, bottom: 120 }}
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

  override key: string;
  override title: string;
  override queryKey: readonly unknown[];
  override queryFunction: QueryFunction<
    | T_NoAuthenticationRequestErrorCode
    | Array<DailyStatistics<VerseUpperMeanDTO>>
  >;

  constructor() {
    super();
    this.key = "popular/verse";
    this.title = "Most fetched Verse";
    this.queryKey = [this.key];
    this.queryFunction = async () => {
      try {
        const url = path.join("statistics", "verse", "popular");

        const response = await axiosNoCredentialInstance.get<
          Response<
            Array<DailyStatistics<T_VerseUpperMeanDTOConstructorParametersJSON>>
          >
        >(url);

        if (response.status === OK_HTTP_RESPONSE_CODE)
          return response.data.data.map(
            (e) =>
              new DailyStatistics<VerseUpperMeanDTO>(
                VerseUpperMeanDTO.createFromJSON(e.data),
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
}

type TemplateProps = {
  chart: ReactNode;
  countValue: number;
  dayRange: number[] | number;
  setCountValue: (val: number) => void;
  setDayRange: Dispatch<SetStateAction<number | number[]>>;
};

class Entry {
  private name: string;
  private count: number;

  constructor(name: string, count: number) {
    this.name = name;
    this.count = count;
  }

  getName(): string {
    return this.name;
  }

  getCount(): number {
    return this.count;
  }
}

// export abstract class SavedTemplate<T> implements IStatisticsTemplate<T> {
//   abstract key: string;
//   abstract title: string;
//   abstract queryKey: QueryKey;
//   abstract queryFunction: QueryFunction<T | T_NoAuthenticationRequestErrorCode>;

//   getTemplate(): ({ children }: { children: ReactNode }) => ReactNode {
//     return ({ children }) => <>{children}</>;
//   }

//   abstract getChart(
//     chart: ReactNode,
//     countValue: number,
//     dayRange: number[] | number,
//     setCountValue: (val: number) => void,
//     setDayRange: (val: number[] | number) => void
//   ): ReactNode;

//   getComposedComponent(): ReactNode {
//     const children = this.getChart();
//     const Template = this.getTemplate();
//     return <Template>{children}</Template>;
//   }
// }

// export class PopularChapterStatistics extends PopularTemplate<
//   Array<DailyStatistics<ChapterUpperMeanDTO>>
// > {
//   override key: string;
//   override title: string;
//   override queryKey: readonly unknown[];
//   override queryFunction: QueryFunction<
//     | T_NoAuthenticationRequestErrorCode
//     | Array<DailyStatistics<ChapterUpperMeanDTO>>
//   >;

//   constructor() {
//     super();
//     this.key = "popular/verse";
//     this.title = "Most fetched Verse";
//     this.queryKey = [this.key];
//     this.queryFunction = async () => {
//       try {
//         const url = path.join("statistics", "popular", "chapter");

//         const response = await axiosNoCredentialInstance.get<
//           Response<
//             Array<
//               DailyStatistics<T_ChapterUpperMeanDTOConstructorParametersJSON>
//             >
//           >
//         >(url);

//         if (response.status === OK_HTTP_RESPONSE_CODE)
//           return response.data.data.map(
//             (e) =>
//               new DailyStatistics<ChapterUpperMeanDTO>(
//                 ChapterUpperMeanDTO.createFromJSON(e.data),
//                 e.dayDictionary
//               )
//           );

//         throw new Error("Unexpected result");
//       } catch (error) {
//         if (!axios.isAxiosError(error)) {
//           console.error(error);
//           addToast({
//             title: "Unknown error",
//             description: "An unexpected error occurred.",
//             color: "danger",
//           });
//           return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
//         }

//         if (error.code === "ERR_NETWORK") {
//           console.error(error);
//           addToast({
//             title: "Network Error",
//             description: "Check your internet connection and try again.",
//             color: "warning",
//           });
//           return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
//         }

//         const status = error.response?.status;

//         switch (status) {
//           case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
//             addToast({
//               title: "Too many requests",
//               description: "Slow down and try again later.",
//               color: "warning",
//             });
//             return status;

//           default:
//             console.error(error);
//             addToast({
//               title: "Unexpected error",
//               description:
//                 "Something went wrong while deleting the note. Check console for more details.",
//               color: "warning",
//             });
//             return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
//         }
//       }
//     };
//   }

//   override getChart(): ReactNode {
//     throw new Error("Method not implemented.");
//   }
// }

// export class PopularSectionStatistics extends PopularTemplate<
//   Array<DailyStatistics<SectionUpperMeanDTO>>
// > {
//   override key: string;
//   override title: string;
//   override queryKey: readonly unknown[];
//   override queryFunction: QueryFunction<
//     | T_NoAuthenticationRequestErrorCode
//     | Array<DailyStatistics<SectionUpperMeanDTO>>
//   >;

//   constructor() {
//     super();
//     this.key = "popular/section";
//     this.title = "Most fetched Section";
//     this.queryKey = [this.key];
//     this.queryFunction = async () => {
//       try {
//         const url = path.join("statistics", "popular", "section");

//         const response = await axiosNoCredentialInstance.get<
//           Response<
//             Array<
//               DailyStatistics<T_SectionUpperMeanDTOConstructorParametersJSON>
//             >
//           >
//         >(url);

//         if (response.status === OK_HTTP_RESPONSE_CODE)
//           return response.data.data.map(
//             (e) =>
//               new DailyStatistics<SectionUpperMeanDTO>(
//                 SectionUpperMeanDTO.createFromJSON(e.data),
//                 e.dayDictionary
//               )
//           );

//         throw new Error("Unexpected result");
//       } catch (error) {
//         if (!axios.isAxiosError(error)) {
//           console.error(error);
//           addToast({
//             title: "Unknown error",
//             description: "An unexpected error occurred.",
//             color: "danger",
//           });
//           return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
//         }

//         if (error.code === "ERR_NETWORK") {
//           console.error(error);
//           addToast({
//             title: "Network Error",
//             description: "Check your internet connection and try again.",
//             color: "warning",
//           });
//           return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
//         }

//         const status = error.response?.status;

//         switch (status) {
//           case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
//             addToast({
//               title: "Too many requests",
//               description: "Slow down and try again later.",
//               color: "warning",
//             });
//             return status;

//           default:
//             console.error(error);
//             addToast({
//               title: "Unexpected error",
//               description:
//                 "Something went wrong while deleting the note. Check console for more details.",
//               color: "warning",
//             });
//             return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
//         }
//       }
//     };
//   }

//   override getChart(): ReactNode {
//     throw new Error("Method not implemented.");
//   }
// }

// export class SavedVerseStatistics extends SavedTemplate<
//   Array<DailyStatistics<VerseUpperMeanDTO>>
// > {
//   override getChart(): ReactNode {
//     throw new Error("Method not implemented.");
//   }
//   override key: string;
//   override title: string;
//   override queryKey: readonly unknown[];
//   override queryFunction: QueryFunction<
//     | T_NoAuthenticationRequestErrorCode
//     | Array<DailyStatistics<VerseUpperMeanDTO>>
//   >;

//   constructor() {
//     super();
//     this.key = "saved/verse";
//     this.title = "Most saved Verse";
//     this.queryKey = [this.key];
//     this.queryFunction = async () => {
//       try {
//         const url = path.join("statistics", "saved", "verse");

//         const response = await axiosNoCredentialInstance.get<
//           Response<
//             Array<DailyStatistics<T_VerseUpperMeanDTOConstructorParametersJSON>>
//           >
//         >(url);

//         if (response.status === OK_HTTP_RESPONSE_CODE)
//           return response.data.data.map(
//             (e) =>
//               new DailyStatistics<VerseUpperMeanDTO>(
//                 VerseUpperMeanDTO.createFromJSON(e.data),
//                 e.dayDictionary
//               )
//           );
//         throw new Error("Unexpected result");
//       } catch (error) {
//         if (!axios.isAxiosError(error)) {
//           console.error(error);
//           addToast({
//             title: "Unknown error",
//             description: "An unexpected error occurred.",
//             color: "danger",
//           });
//           return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
//         }

//         if (error.code === "ERR_NETWORK") {
//           console.error(error);
//           addToast({
//             title: "Network Error",
//             description: "Check your internet connection and try again.",
//             color: "warning",
//           });
//           return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
//         }

//         const status = error.response?.status;

//         switch (status) {
//           case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
//             addToast({
//               title: "Too many requests",
//               description: "Slow down and try again later.",
//               color: "warning",
//             });
//             return status;

//           default:
//             console.error(error);
//             addToast({
//               title: "Unexpected error",
//               description:
//                 "Something went wrong while deleting the note. Check console for more details.",
//               color: "warning",
//             });
//             return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
//         }
//       }
//     };
//   }

//   override getChart(): ReactNode {
//     return <></>;
//   }
// }
