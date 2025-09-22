"use client";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { fetchBookNodesAndSubNodesOrTexts } from "./utils/functions";

import { T_NoAuthenticationRequestErrorCode } from "@/types/response";
import {
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { getErrorComponent } from "@/util/reactUtil";
import { useQuery } from "@tanstack/react-query";
import BookNotFound from "../../../../components/book/BookNotFound";
import { T_PartMeaningPageRouteParams } from "./utils/types";
import PartWithNodes from "./components/PartWithNodes";
import PartWithTexts from "./components/PartWithTexts";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import { BookNodeCoverOneLevelUpperBookAndOneLevelLower } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBookAndOneLevelLower/BookNodeCoverOneLevelUpperBookAndOneLevelLower";
import { BookNodeCoverOneLevelUpperBookAndOneLevelLowerText } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBookAndOneLevelLowerText/BookNodeCoverOneLevelUpperBookAndOneLevelLowerText";

const Main: NextPage = () => {
  const {
    bookMeaning: bookMeaningRouteParam,
    partMeaning: partMeaningRouteParam,
  } = useParams<T_PartMeaningPageRouteParams>();

  const params = [bookMeaningRouteParam, partMeaningRouteParam];

  const { data: partNode = null, isLoading } = useQuery<
    | BookNodeCoverOneLevelUpperBookAndOneLevelLower
    | BookNodeCoverOneLevelUpperBookAndOneLevelLowerText
    | T_NoAuthenticationRequestErrorCode
  >({
    queryKey: ["book", ...params],
    queryFn: async () => fetchBookNodesAndSubNodesOrTexts(...params),
  });

  if (isLoading) return <LoadingSpinnerFullHeight />;

  if (partNode === null || isNoAuthenticationRequestErrorCode(partNode))
    return getErrorComponent({
      code: partNode,
      preferredErrorComponent: {
        [NOT_FOUND_HTTP_RESPONSE_CODE]: <BookNotFound params={params} />,
      },
    });

  if (partNode instanceof BookNodeCoverOneLevelUpperBookAndOneLevelLower)
    return <PartWithNodes partNode={partNode} />;
  else if (
    partNode instanceof BookNodeCoverOneLevelUpperBookAndOneLevelLowerText
  )
    return <PartWithTexts partNode={partNode} />;
  else return <BookNotFound params={params} />;
};

export default Main;
