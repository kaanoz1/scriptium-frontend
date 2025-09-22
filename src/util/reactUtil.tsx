import React from "react";
import { Tooltip } from "@heroui/tooltip";
import { MdVerified } from "react-icons/md";
import {
  T_AuthenticationRequestErrorCode,
  T_NoAuthenticationRequestErrorCode,
} from "@/types/response";
import { JSX, ReactNode } from "react";
import NotFound from "@/components/UI/NotFound";
import TooManyRequest from "@/components/UI/TooManyRequest";
import InternalServerError from "@/components/UI/InternalServerError";

import {
  NOT_FOUND_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
} from "./constants";
import { Footnote } from "@/types/classes/model/Footnote/Footnote";

export const RoleIcon: Record<
  string,
  {
    icon: (props: { size?: number; className?: string }) => JSX.Element;
    backgroundColor: string;
  }
> = {
  Admin: {
    icon: ({ size = 20, className = "text-violet-700" }) => (
      <MdVerified size={size} className={className} />
    ),
    backgroundColor: "bg-violet-700",
  },
  Verified: {
    icon: ({ size = 20, className = "text-blue-500" }) => (
      <MdVerified size={size} className={className} />
    ),
    backgroundColor: "bg-blue-500",
  },
} as const;

export function injectTooltips(
  text: string,
  footnotes: Footnote[]
): Array<string | JSX.Element> {
  const sortedFootnotes = [...footnotes].sort(
    (a, b) => a.getIndex() - b.getIndex()
  );

  const result: Array<string | JSX.Element> = [];
  let lastIndex = 0;

  sortedFootnotes.forEach((dto, i) => {
    const index = dto.getIndex();

    if (index > lastIndex) result.push(text.slice(lastIndex, index));

    if (index < text.length) {
      const charAtIndex = dto.getText()[index] ?? "";
      result.push(charAtIndex);

      result.push(
        <Tooltip key={`tooltip-${i}`} content={text} placement="top">
          <sup className="ml-1 text-xs align-super cursor-pointer underline text-blue-600">
            {i + 1}
          </sup>
        </Tooltip>
      );

      lastIndex = index + 1;
    }
  });

  if (lastIndex < text.length) result.push(text.slice(lastIndex));

  return result;
}

export const getErrorComponent = (
  data: {
    code:
      | T_NoAuthenticationRequestErrorCode
      | T_AuthenticationRequestErrorCode
      | null;
    preferredErrorComponent?: Partial<
      Record<T_NoAuthenticationRequestErrorCode, ReactNode>
    >;
  } = { code: NOT_FOUND_HTTP_RESPONSE_CODE, preferredErrorComponent: {} }
): ReactNode => {
  const { code, preferredErrorComponent = {} } = data;
  switch (code) {
    case NOT_FOUND_HTTP_RESPONSE_CODE:
      return preferredErrorComponent[code] ?? <NotFound />;
    case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
      return preferredErrorComponent[code] ?? <TooManyRequest />;
    case INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE:
      return preferredErrorComponent[code] ?? <InternalServerError />;
    default:
      return <NotFound />;
  }
};
