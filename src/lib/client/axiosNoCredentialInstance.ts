"use client";

import axios from "axios";

function resolveBaseURL(): string {
  if (process.env.NODE_ENV === "development") return "/api";
  const url = process.env["NEXT_PUBLIC_SERVER_URL"];

  if (!url)
    throw new Error("NEXT_PUBLIC_SERVER_URL is not defined in production.");

  return url;
}

const baseURL = resolveBaseURL();

console.log(`BaseUrl from axiosNoCredentialInstance ${baseURL}`);

const axiosNoCredentialInstance = axios.create({
  baseURL,
});

export default axiosNoCredentialInstance;
