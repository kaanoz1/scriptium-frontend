"use client";

import { T_NoAuthenticationRequestErrorCode } from "@/types/response";
import {
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { getErrorComponent } from "@/util/reactUtil";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import BookNotFound from "../../../../../../components/book/BookNotFound";
import { fetchDivisionBookNodesAndSectionNodesOrTexts } from "./utils/function";
import { T_DivisionMeaningPageRouteParams } from "./utils/types";
import DivisionWithNodes from "./components/DivisionWithNodes";
import DivisionWithTexts from "./components/DivisionWithTexts";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import { BookNodeCoverThreeLevelUpperBookAndOneLevelLower } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverThreeLevelUpperBookAndOneLevelLower/BookNodeCoverThreeLevelUpperBookAndOneLevelLower";
import { BookNodeCoverThreeLevelUpperBookAndOneLevelLowerText } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverThreeLevelUpperBookAndOneLevelLowerText/BookNodeCoverThreeLevelUpperBookAndOneLevelLowerText";

const Main: NextPage = () => {
  const {
    bookMeaning: bookMeaningRouteParam,
    partMeaning: partMeaningRouteParam,
    subPartMeaning: subPartMeaningRouteParam,
    divisionMeaning: divisionMeaningRouteParam,
  } = useParams<T_DivisionMeaningPageRouteParams>();

  const params = [
    bookMeaningRouteParam,
    partMeaningRouteParam,
    subPartMeaningRouteParam,
    divisionMeaningRouteParam,
  ];

  const { data: divisionNode = null, isLoading } = useQuery<
    | BookNodeCoverThreeLevelUpperBookAndOneLevelLower
    | BookNodeCoverThreeLevelUpperBookAndOneLevelLowerText
    | T_NoAuthenticationRequestErrorCode
  >({
    queryKey: ["book", ...params],
    queryFn: async () =>
      await fetchDivisionBookNodesAndSectionNodesOrTexts(...params),
  });

  if (isLoading) return <LoadingSpinnerFullHeight />;

  if (divisionNode === null || isNoAuthenticationRequestErrorCode(divisionNode))
    return getErrorComponent({
      code: divisionNode,
      preferredErrorComponent: {
        [NOT_FOUND_HTTP_RESPONSE_CODE]: <BookNotFound params={params} />,
      },
    });

  if (divisionNode instanceof BookNodeCoverThreeLevelUpperBookAndOneLevelLower)
    return <DivisionWithNodes divisionNode={divisionNode} />;
  else if (
    divisionNode instanceof BookNodeCoverThreeLevelUpperBookAndOneLevelLowerText
  )
    return <DivisionWithTexts divisionNode={divisionNode} />;
  else return <BookNotFound params={params} />;
};

export default Main;
