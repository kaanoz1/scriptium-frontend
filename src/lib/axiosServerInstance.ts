import axios from "axios";

function resolveServerBaseURL(): string {
  if (process.env.NODE_ENV === "development") return "http://backend:5000";

  const url = process.env["PRIVATE_SERVER_URL"];
  if (!url)
    throw new Error(
      "PRIVATE_SERVER_URL is not defined on the server in production."
    );

  return url;
}

const baseURL = resolveServerBaseURL();

console.log(`BaseUrl from axiosServerInstance ${baseURL}`);

const axiosServerInstance = axios.create({
  baseURL,
  withCredentials: false,
});

export default axiosServerInstance;
