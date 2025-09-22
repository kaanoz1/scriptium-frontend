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
import { T_SectionMeaningPageRouteParams } from "./utils/types";
import { fetchSectionBookNodesAndSectionNodesOrTexts } from "./utils/function";
import SectionWithNodes from "./components/SectionWithNodes";
import SectionWithTexts from "./components/SectionWithTexts";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import { BookNodeCoverFourLevelUpperBookAndOneLevelLower } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFourLevelUpperBookAndOneLevelLowerCover/BookNodeCoverFourLevelUpperBookAndOneLevelLowerCover";
import { BookNodeCoverFourLevelUpperBookAndOneLevelLowerText } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFourLevelUpperBookAndOneLevelLowerText/BookNodeCoverFourLevelUpperBookAndOneLevelLowerText";

const Main: NextPage = () => {
  const {
    bookMeaning: bookMeaningRouteParam,
    partMeaning: partMeaningRouteParam,
    subPartMeaning: subPartMeaningRouteParam,
    divisionMeaning: divisionMeaningRouteParam,
    sectionMeaning: sectionMeaningRouteParam,
  } = useParams<T_SectionMeaningPageRouteParams>();

  const params = [
    bookMeaningRouteParam,
    partMeaningRouteParam,
    subPartMeaningRouteParam,
    divisionMeaningRouteParam,
    sectionMeaningRouteParam,
  ];

  const { data: sectionNode = null, isLoading } = useQuery<
    | BookNodeCoverFourLevelUpperBookAndOneLevelLower
    | BookNodeCoverFourLevelUpperBookAndOneLevelLowerText
    | T_NoAuthenticationRequestErrorCode
  >({
    queryKey: ["book", ...params],
    queryFn: async () => fetchSectionBookNodesAndSectionNodesOrTexts(...params),
  });

  if (isLoading) return <LoadingSpinnerFullHeight />;

  if (sectionNode === null || isNoAuthenticationRequestErrorCode(sectionNode))
    return getErrorComponent({
      code: sectionNode,
      preferredErrorComponent: {
        [NOT_FOUND_HTTP_RESPONSE_CODE]: <BookNotFound params={params} />,
      },
    });

  if (sectionNode instanceof BookNodeCoverFourLevelUpperBookAndOneLevelLower)
    return <SectionWithNodes sectionNode={sectionNode} />;
  else if (
    sectionNode instanceof BookNodeCoverFourLevelUpperBookAndOneLevelLowerText
  )
    return <SectionWithTexts sectionNode={sectionNode} />;
  else return <BookNotFound params={params} />;
};

export default Main;
