import React from "react";
import { notFound } from "next/navigation";
import { ResponseCodes } from "@/util/types/ResponseCodes";
import RateLimitError from "@/util/components/Error/RateLimitError";
import ServerError from "@/util/components/Error/ServerError";
import UnknownError from "@/util/components/Error/UnknownError";

/**
 * Error rendering shared by the hadith pages (server side). Returns null for
 * OK, throws Next's notFound() for 404 and an error component otherwise.
 */
export function statusView(status: number): React.ReactElement | null {
  switch (status) {
    case ResponseCodes.OK:
      return null;
    case ResponseCodes.NOT_FOUND:
    case ResponseCodes.BAD_REQUEST:
      notFound();
    case ResponseCodes.TOO_MANY_REQUESTS:
      return <RateLimitError />;
    case ResponseCodes.INTERNAL_SERVER_ERROR:
      return <ServerError />;
    default:
      return <UnknownError />;
  }
}

/** Parses a positive integer route/query value, or returns null. */
export const positiveInt = (value: string | string[] | undefined): number | null => {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !/^\d{1,9}$/.test(raw)) return null;
  const n = Number.parseInt(raw, 10);
  return n >= 1 ? n : null;
};

/** Parses an integer (may be negative) query value within [min, max]. */
export const intInRange = (value: string | string[] | undefined, min: number, max: number): number | null => {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !/^-?\d{1,3}$/.test(raw)) return null;
  const n = Number.parseInt(raw, 10);
  return n >= min && n <= max ? n : null;
};

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;
