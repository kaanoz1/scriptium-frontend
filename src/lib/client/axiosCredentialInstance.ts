"use client";

import axios from "axios";

function resolveBaseURL(): string {
  const url = process.env["NEXT_PUBLIC_SERVER_URL"];

  if (!url)
    throw new Error("NEXT_PUBLIC_SERVER_URL is not defined in production.");

  return url;
}

const baseURL = resolveBaseURL();

console.log(`BaseUrl from axiosCredentialInstance ${baseURL}`);

const axiosCredentialInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosCredentialInstance;
