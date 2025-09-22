"use client";

import BookNotFound from "@/components/book/BookNotFound";

import { T_NoAuthenticationRequestErrorCode } from "@/types/response";
import {
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { getErrorComponent } from "@/util/reactUtil";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import { T_ChapterMeaningPageRouteParams } from "./utils/types";
import { fetchChapterBookNodesAndChapterNodesOrTexts } from "./utils/function";
import ChapterWithNodes from "./components/ChapterWithNodes";
import ChapterWithTexts from "./components/ChapterWithTexts";
import { BookNodeCoverFiveLevelUpperBookAndOneLevelLower } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFiveLevelUpperBookAndOneLevelLower/BookNodeCoverFiveLevelUpperBookAndOneLevelLower";
import { BookNodeCoverFiveLevelUpperBookAndOneLevelLowerText } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFiveLevelUpperBookAndOneLevelLowerText/BookNodeCoverFiveLevelUpperBookAndOneLevelLowerText";

const Main: NextPage = () => {
  const {
    bookMeaning: bookMeaningRouteParam,
    partMeaning: partMeaningRouteParam,
    subPartMeaning: subPartMeaningRouteParam,
    divisionMeaning: divisionMeaningRouteParam,
    sectionMeaning: sectionMeaningRouteParam,
    chapterMeaning: chapterMeaningRouteParam,
  } = useParams<T_ChapterMeaningPageRouteParams>();

  const params = [
    bookMeaningRouteParam,
    partMeaningRouteParam,
    subPartMeaningRouteParam,
    divisionMeaningRouteParam,
    sectionMeaningRouteParam,
    chapterMeaningRouteParam,
  ];

  const { data: chapterNode = null, isLoading } = useQuery<
    | BookNodeCoverFiveLevelUpperBookAndOneLevelLower
    | BookNodeCoverFiveLevelUpperBookAndOneLevelLowerText
    | T_NoAuthenticationRequestErrorCode
  >({
    queryKey: ["book", ...params],
    queryFn: async () => fetchChapterBookNodesAndChapterNodesOrTexts(...params),
  });

  if (isLoading) return <LoadingSpinnerFullHeight />;

  if (chapterNode === null || isNoAuthenticationRequestErrorCode(chapterNode))
    return getErrorComponent({
      code: chapterNode,
      preferredErrorComponent: {
        [NOT_FOUND_HTTP_RESPONSE_CODE]: <BookNotFound params={params} />,
      },
    });

  if (chapterNode instanceof BookNodeCoverFiveLevelUpperBookAndOneLevelLower)
    return <ChapterWithNodes chapterNode={chapterNode} />;
  else if (
    chapterNode instanceof BookNodeCoverFiveLevelUpperBookAndOneLevelLowerText
  )
    return <ChapterWithTexts chapterNode={chapterNode} />;
  else return <BookNotFound params={params} />;
};

export default Main;
