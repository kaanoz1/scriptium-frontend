"use client";
import { NextPage } from "next";
import { T_SubPartMeaningPageRouteParams } from "./utils/types";
import { useParams } from "next/navigation";
import { fetchSubPartBookNodesAndSectionNodesOrTexts } from "./utils/function";
import { T_NoAuthenticationRequestErrorCode } from "@/types/response";
import {
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { getErrorComponent } from "@/util/reactUtil";
import { useQuery } from "@tanstack/react-query";
import BookNotFound from "../../../../../components/book/BookNotFound";

import SubPartWithNodes from "./components/SubPartWithNodes";
import SubPartWithTexts from "./components/SubPartWithTexts";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import { BookNodeCoverTwoLevelUpperBookAndOneLevelLower } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverTwoLevelUpperBookAndOneLevelLower/BookNodeCoverTwoLevelUpperBookAndOneLevelLower";
import { BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText/BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText";

const Main: NextPage = () => {
  const {
    bookMeaning: bookMeaningRouteParam,
    partMeaning: partMeaningRouteParam,
    subPartMeaning: subPartMeaningRouteParam,
  } = useParams<T_SubPartMeaningPageRouteParams>();

  const params = [
    bookMeaningRouteParam,
    partMeaningRouteParam,
    subPartMeaningRouteParam,
  ];

  const { data: subPartNode = null, isLoading } = useQuery<
    | BookNodeCoverTwoLevelUpperBookAndOneLevelLower
    | BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText
    | T_NoAuthenticationRequestErrorCode
  >({
    queryKey: ["book", ...params],
    queryFn: async () => fetchSubPartBookNodesAndSectionNodesOrTexts(...params),
  });

  if (isLoading) return <LoadingSpinnerFullHeight />;

  if (subPartNode === null || isNoAuthenticationRequestErrorCode(subPartNode))
    return getErrorComponent({
      code: subPartNode,
      preferredErrorComponent: {
        [NOT_FOUND_HTTP_RESPONSE_CODE]: <BookNotFound params={params} />,
      },
    });

  if (subPartNode instanceof BookNodeCoverTwoLevelUpperBookAndOneLevelLower) {
    return <SubPartWithNodes subPartNode={subPartNode} />;
  } else if (
    subPartNode instanceof BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText
  ) {
    return <SubPartWithTexts subPartNode={subPartNode} />;
  } else return <BookNotFound params={params} />;
};

export default Main;
